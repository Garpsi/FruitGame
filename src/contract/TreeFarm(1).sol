// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title The standard IERC20 interface.
 */
interface IERC20 {
	function totalSupply() external view returns (uint256);
	function decimals() external view returns (uint8);
	function symbol() external view returns (string memory);
	function name() external view returns (string memory);
	function balanceOf(address account) external view returns (uint256);
	function transfer(address recipient, uint256 amount) external returns (bool);
	function allowance(address _owner, address spender) external view returns (uint256);
	function approve(address spender, uint256 amount) external returns (bool);
	function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title Multiple authorization base contract.
 * @dev This is a full authorisation non-grained system that allows several wallets to have full control of the same contract.
 * Original owner still has absolute control as they may authorize or unauthorize anyone.
 * Main owner should be a multi-sig wallet for security purposes.
 * For more fine grained control needs, the extended version of this contract with roles should be used instead.
 */
abstract contract Auth {
    address internal owner;
    mapping (address => bool) internal authorizations;

    constructor(address _owner) {
        owner = _owner;
        authorizations[_owner] = true;
    }

    /**
     * @dev Function modifier to require caller to be contract owner.
     */
    modifier onlyOwner() {
        require(isOwner(msg.sender), "!OWNER"); _;
    }

    /**
     * @dev Function modifier to require caller to be authorized.
     */
    modifier authorized() {
        require(isAuthorized(msg.sender), "!AUTHORIZED"); _;
    }

    /**
     * @dev Authorize address. Owner only.
     */
    function authorize(address adr) public onlyOwner {
        authorizations[adr] = true;
    }

    /**
     * @dev Remove address' authorization. Owner only.
     */
    function unauthorize(address adr) public onlyOwner {
        authorizations[adr] = false;
    }

    /**
     * @dev Check if address is owner.
     */
    function isOwner(address account) public view returns (bool) {
        return account == owner;
    }

    /**
     * @dev Return address' authorization status.
     */
    function isAuthorized(address adr) public view returns (bool) {
        return authorizations[adr];
    }

    /**
     * @dev Transfer ownership to new address. Caller must be owner. Leaves old owner authorized.
     */
    function transferOwnership(address payable adr) public onlyOwner {
        owner = adr;
        authorizations[adr] = true;
        emit OwnershipTransferred(adr);
    }

    event OwnershipTransferred(address owner);
}

/**
 * @title Representation of a fraction.
 * @dev Fractions can be used to represent fixed doubles to use as percentages
 * with more precision than an fixed length percentage on a single uint, should anyone wish to.
 * Say, for a staking APR that is initially planned to be 10%, then you would store on an uint8 variable a 10
 * and subsequently always divide by 100. This leaves us with only whole number percentages from 0 to 100,
 * thus always limited by the digits initially available.
 * By picking a numerator and denominator, you can use whatever percentage floats your boat,
 * and using just about the right amount of storage space.
 * To get the percentage of a number, you just have to multiply it by numerator then divide by numerator.
 * Using uints with an invisible fixed point makes human error more likely.
 * @param numerator Fraction numerator.
 * @param denominator Fraction denominator.
 * @notice Usage of uint16 is arbitrary and smaller or bigger amounts may be used for varying fixed point precision.
 */
struct Fraction {
	uint16 numerator;
	uint16 denominator;
}

/**
 * @title Definition of a type of farm tree
 * @dev This struct contains the information relevant to each of the 12 available trees you can plant on a plot.
 * Each level includes a price to advance to next level, the yield the current level gives, and the tax on the current level
 * when redeeming BUSD from earnt FarmBucks.
 * @param pricePerLevel The price to get to the next level. In position 0 you will get the price to reach position 1.
 * @param yieldPerLevel The percentual yield this tree gives on a specific level represented by a fraction.
 * @param taxPerLevel The percentual tax to pay for redeeming on a specific level represented by a fraction.
 * @notice There should always be a level 0 and level 1, for non-existing and existing tree.
 */
struct TreeType {
	uint256[] pricePerLevel;
	Fraction[] yieldPerLevel;
	Fraction[] taxPerLevel;
}

/**
 * @title Definition of the tree planted on a specific plot
 * @dev A tree has a current level ranging from 0 to the max available, which should be no bigger than 16,777,215.
 * If currentLevel is 0, it means a tree is not planted and it does not exist.
 * @param currentLevel The level of the tree.
 * @param lastYield Timestamp with the last time this tree yielded FarmBucks in any way or form.
 * @param investedBucks contains the amount of bucks invested into that tree, accumulative.
 * @param yieldedBucks contains the amount of bucks yielded by that specific tree, accumulative.
 * @param yieldedBUSD contains the amount of BUSD redeemed out from the yielded FarmBucks, accumulative.
 * @notice Order of fields in structs is relevant for storage packing and using less gas.
 * @notice For time units, there is no need to store time in uint bigger than 32, as unix timestamp in
 * seconds reaches a limit by Sunday, 7th February 2106 in 32 unsigned bit.
 */
struct Tree {
	uint24 currentLevel;
	uint32 lastYield;
	uint256 investedBucks;
	uint256 yieldedBucks;
	uint256 yieldedBUSD;
}

/**
 * @title Boost to a yield
 * @param start When does the boost start being active.
 * @param duration Once activated, how long does the boost last.
 * @param price What's the price in FarmBucks to buy one.
 * @param percentage The percentage for the boost.
 */
struct Boost {
	uint32 start;
	uint32 duration;
	uint256 price;
	Fraction percentage;
}

/**
 * @title Main farm contract.
 */
contract TreeFarm is Auth, IERC20 {

	/**
	 * @dev a FarmBuck is 1:1 pegged to BUSD, and we use BUSD for rewards, compound, and token information.
	 */
	IERC20 immutable BUSD;
	uint256 private _supply;
	uint40 public maxYieldTime = 1 days;
	TreeType[12] private treeTypes;
	Boost[] public boostTypes;
	bool private boostsActive;
	bool private privateMinted;
	uint256 private privateMintAmount = 1000 ether;
	Fraction private refererAmount = Fraction(5, 100);
	mapping (address => uint256) private _balances;
	mapping (address => mapping (address => bool)) private _spender;
	mapping (address => Tree[12]) private _plots;
	mapping (address => Boost) private _boosts;
	mapping (address => address) private _referers;
	bool private _transferAllowed = false;

	event FarmBuckPurchase(address indexed buyer, uint256 amount);
	event TreePlant(address indexed owner, uint256 indexed plot);
	event Compounded(address indexed owner, uint256 indexed plot, uint256 amount);
	event Invested(address indexed owner, uint256 indexed plot, uint256 amount);
	event RedeemFarmBuck(address indexed owner, uint256 indexed plot, uint256 amount);
	event RedeemBUSD(address indexed owner, uint256 indexed plot, uint256 amount);
	event FarmBuckApproval(address indexed owner, address indexed spender, bool allowed);

	constructor() Auth(msg.sender) {
		address busdAddy;
		// Set up the address for the BUSD stablecoin to acquire farm bucks.
		if (block.chainid == 97) {
			// BSC Testnet
			busdAddy = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;
		} else {
			// BSC Mainnet
			busdAddy = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
		}
		BUSD = IERC20(busdAddy);
	}

	modifier validPlot(uint256 plot) {
		require(plot < treeTypes.length, "That plot does not exist.");
		_;
	}

	function totalSupply() external view override returns (uint256) {
		return _supply;
	}

	/**
	 * @dev All instances of BUSD have 18 decimals.
	 */
	function decimals() external pure override returns (uint8) {
		return 18;
	}

	function symbol() external pure override returns (string memory) {
		return "FBUCK";
	}

	function name() external pure override returns (string memory) {
		return "FarmBuck";
	}

	function balanceOf(address farmer) public view override returns (uint256) {
		return _balances[farmer];
	}

	/**
	 * @dev Limits if farmbucks can be transferred normally by users or only by owner.
	 */
	modifier transfersAllowed() {
		require(_transferAllowed || msg.sender == owner, "FarmBuck transfer is not currently allowed.");
		_;
	}

	function transfer(address recipient, uint256 amount) external override transfersAllowed returns (bool) {
		_transfer(msg.sender, recipient, amount);

		return true;
	}

	function transferFrom(address sender, address recipient, uint256 amount) external override transfersAllowed returns (bool) {
		 _transfer(sender, recipient, amount);
        require(spendingAllowed(sender, msg.sender), "You are not allowed to spend those FarmBucks.");

		return true;
	}

	function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "FarmBuck: transfer from the zero address.");
        require(recipient != address(0), "FarmBuck: transfer to the zero address.");
        require(amount > 0, "FarmBuck: Transfer amount must be greater than zero.");
		uint256 senderBalance = _balances[sender];
		require(senderBalance >= amount, "Sender does not own enough FarmBucks.");
		unchecked {
			_balances[sender] = senderBalance - amount;
			_balances[recipient] += amount;
		}

		emit Transfer(sender, recipient, amount);
	}

	function allowance(address _owner, address spender) external view override returns (uint256) {
		if (spendingAllowed(_owner, spender)) {
			return _supply;
		}
		return 0;
	}

	/**
	 * @dev Since there's only either approved to manage your farm bucks or not, in the standard function any amount over 0
	 * means full approval and a 0 means no approval.
	 * @notice This function is only provided to fully comply with standard, the contract internally works slightly differently
	 * from what's expected of ERC20.
	 */
	function approve(address spender, uint256 amount) external override returns (bool) {
		bool isApproval = amount > 0;
		allowSpending(spender, isApproval);
		emit Approval(msg.sender, spender, _supply);
		return true;
	}

	function deposit(uint256 amount) external {
		_doDeposit(amount);
	}

	function _doDeposit(uint256 amount) internal {
		require(IERC20(BUSD).transferFrom(msg.sender, address(this), amount));
		unchecked {
			_balances[msg.sender] += amount;
		}
		if (_referers[msg.sender] != address(0)) {
			uint256 give = amount * refererAmount.numerator / refererAmount.denominator;
			// Not unchecked in case the referer percentage tuple is misconfigured.
			_balances[_referers[msg.sender]] += give;
		}

		emit FarmBuckPurchase(msg.sender, amount);
	}

	function depositWithRefer(uint256 amount, address referer) external {
		_referers[msg.sender] = referer;
		_doDeposit(amount);
	}

	function buyBoost(uint256 index) external {
		require(boostsActive, "Boost are not currently available.");
		Boost memory currBoost = _boosts[msg.sender];
		if (currBoost.start > 0) {
			require(currBoost.start + currBoost.duration < block.timestamp, "You still have an active boost.");
		}
		Boost memory boo = boostTypes[index];
		require(_balances[msg.sender] >= boo.price, "You do not own enough farmbucks to boost.");
		unchecked {
			_balances[msg.sender] -= boo.price;
		}
		Boost memory newBoost = boo;
		newBoost.start = uint32(block.timestamp);
		_boosts[msg.sender] = newBoost;
	}

	function getCurrentBoost(address booster) external view returns (Boost memory) {
		return _boosts[booster];
	}

	function plantFirstTree(uint256 plot) external validPlot(plot) {
		// To plant the tree on the plot to get to level 1 you need to pay the exact value.
		uint256 price = getTreeTypePrice(plot, 0);
		require(_balances[msg.sender] >= price, "You do not own enough farmbucks.");

		// Of course it must be an empty plot.
		Tree memory plotTreeState = _plots[msg.sender][plot];
		require(plotTreeState.currentLevel == 0, "You have already planted the first tree in that plot!");
		unchecked {
			_balances[msg.sender] -= price;
		}

		// Store the new tree.
		_plots[msg.sender][plot].currentLevel = 1;
		_plots[msg.sender][plot].investedBucks = price;
		_plots[msg.sender][plot].lastYield = uint32(block.timestamp);

		emit TreePlant(msg.sender, plot);
	}

	function investInTree(uint256 plot, uint256 amount) external validPlot(plot) {
		require(_balances[msg.sender] >= amount, "You do not own enough farmbucks.");

		_addBucks(plot, msg.sender, amount, false);

		// Already checked above.
		unchecked {
			_balances[msg.sender] -= amount;
		}

		emit Invested(msg.sender, plot, amount);
	}

	function _addBucks(uint256 plot, address plotOwner, uint256 amount, bool fromYield) internal {
		// Get the relevant plot information.
		Tree memory plotTreeState = _plots[plotOwner][plot];

		// The tree must be already level 1 at least.
		require(plotTreeState.currentLevel > 0, "No tree on this plot, you have to plant it first.");

		plotTreeState.investedBucks += amount;

		// If the investment gets the tree above next level, increase it.
		if (canTreeLevelUp(plot, plotTreeState.currentLevel)) {
			uint256 nextLevelPrice = getTreeTypePrice(plot, plotTreeState.currentLevel);

			if (plotTreeState.investedBucks >= nextLevelPrice) {
				plotTreeState.currentLevel++;
			}
		}

		if (fromYield) {
			plotTreeState.yieldedBucks += amount;
			plotTreeState.lastYield = uint32(block.timestamp);
		}

		// Store the tree state changes.
		_plots[plotOwner][plot] = plotTreeState;
	}

	/**
	 * Each user has a list of plots.
	 * Each plot has exactly one type of tree.
	 * Thus, each user has as many plots available as tree types are, starting from level 0 (no tree).
	 */
	function getPlotState(address owner, uint256 plot) public view validPlot(plot) returns (Tree memory) {
		return _plots[owner][plot];
	}

	/**
	 * @dev Sugar for easier querying of one own's plot.
	 */
	function getMyPlotState(uint256 plot) external view returns (Tree memory) {
		return getPlotState(msg.sender, plot);
	}

	function getTreeTypePrice(uint256 plot, uint256 level) public view validPlot(plot) returns (uint256) {
		TreeType memory tt = treeTypes[plot];

		// Query for the price must be for an available level.
		if (tt.pricePerLevel.length < level) {
			revert("Invalid level query.");
		}

		return tt.pricePerLevel[level];
	}

	/**
	 * @dev Whether a tree can still get a level up or it's at max level.
	 */
	function canTreeLevelUp(uint256 plot, uint256 currentLevel) public view validPlot(plot) returns (bool) {
		TreeType memory tt = treeTypes[plot];

		return currentLevel < tt.pricePerLevel.length;
	}

	/**
	 * @dev Compounds the current available yield for the plot.
	 */
	function compound(uint256 plot) external validPlot(plot) {
		uint256 yield = getAvailableYield(plot);
		_addBucks(plot, msg.sender, yield, true);

		emit Compounded(msg.sender, plot, yield);
	}

	function allowedToSpend(address _owner, address spender) public view returns (bool) {
		return _spender[_owner][spender];
	}

	function compoundFor(address receiver, uint256 plot) external validPlot(plot) {
		require(spendingAllowed(receiver, msg.sender));
		uint256 yield = _getAvailableYieldOf(receiver, plot);
		_addBucks(plot, receiver, yield, true);

		emit Compounded(receiver, plot, yield);
	}

	/**
	 * @dev Sells the current available yield on the plot for FarmBucks.
	 */
	function redeemFarmbuck(uint256 plot) external validPlot(plot) {
		uint256 yield = getAvailableYield(plot);
		Tree memory tree = _plots[msg.sender][plot];
		unchecked {
			_balances[msg.sender] += yield;
		}
		tree.yieldedBucks += yield;
		tree.lastYield = uint32(block.timestamp);
		_plots[msg.sender][plot] = tree;

		emit RedeemFarmBuck(msg.sender, plot, yield);
	}

	function redeemFarmbuckFor(address receiver, uint256 plot) external validPlot(plot) {
		require(spendingAllowed(receiver, msg.sender));
		uint256 yield = _getAvailableYieldOf(receiver, plot);
		Tree memory tree = _plots[receiver][plot];
		unchecked {
			_balances[receiver] += yield;
		}
		tree.yieldedBucks += yield;
		tree.lastYield = uint32(block.timestamp);
		_plots[receiver][plot] = tree;

		emit RedeemFarmBuck(receiver, plot, yield);
	}

	/**
	 * Sells the current available yield on the plot for BUSD at a taxed rate.
	 */
	function redeemBUSD(uint256 plot) external validPlot(plot) {
		uint256 yield = getAvailableYield(plot);
		TreeType memory tt = treeTypes[plot];
		Tree memory tree = _plots[msg.sender][plot];
		Fraction memory tax = tt.taxPerLevel[tree.currentLevel];
		uint256 taxed = yield * tax.numerator / tax.denominator;
		uint256 busdYield = yield - taxed;
		BUSD.transfer(msg.sender, busdYield);
		tree.yieldedBUSD += busdYield;
		tree.lastYield = uint32(block.timestamp);
		_plots[msg.sender][plot] = tree;

		emit RedeemBUSD(msg.sender, plot, yield);
	}

	function redeemBUSDFor(address receiver, uint256 plot) external validPlot(plot) {
		require(spendingAllowed(receiver, msg.sender));
		uint256 yield = _getAvailableYieldOf(receiver, plot);
		TreeType memory tt = treeTypes[plot];
		Tree memory tree = _plots[receiver][plot];
		Fraction memory tax = tt.taxPerLevel[tree.currentLevel];
		uint256 taxed = yield * tax.numerator / tax.denominator;
		uint256 busdYield = yield - taxed;
		BUSD.transfer(receiver, busdYield);
		tree.yieldedBUSD += busdYield;
		tree.lastYield = uint32(block.timestamp);
		_plots[receiver][plot] = tree;

		emit RedeemBUSD(receiver, plot, yield);
	}

	function getAvailableYield(uint256 plot) public view validPlot(plot) returns (uint256) {
		return _getAvailableYieldOf(msg.sender, plot);
	}

	function _getAvailableYieldOf(address farmer, uint256 plot) internal view returns (uint256) {
		// Get the current tree state of that plot.
		Tree memory plotTreeState = _plots[farmer][plot];

		// Time since the last time the plot yielded money was either compounded or sold.
		uint256 elapsedTime = block.timestamp - plotTreeState.lastYield;
		if (elapsedTime == 0) {
			return 0;
		}

		// Get the fraction representing the percentual yield of the tree in its current level.
		Fraction memory y = treeTypes[plot].yieldPerLevel[plotTreeState.currentLevel];

		// If it's above the max time a yield can be left without either compounding or selling, cap it.
		uint256 yieldingTime = elapsedTime > maxYieldTime ? maxYieldTime : elapsedTime;

		// Return the yield given in one day adapted to the amount to receive within the actual timeframe.
		uint256 yielded = getYieldByTime(plotTreeState.investedBucks, yieldingTime, y);

		// Add boosts if appliable
		if (boostsActive) {
			Boost memory boo = _boosts[farmer];
			if (boo.start + boo.duration > block.timestamp) {
				uint256 extra = yielded * boo.percentage.numerator / boo.percentage.denominator;
				yielded += extra;
			}
		}

		return yielded;
	}

	/**
	 * @dev Given an initial investment, a time elapsed in seconds, and a yield percentage
	 * represented in a numerator and denominator fraction, get the resulting yield.
	 * @notice an arbitrary precision number is used to make sure no digits are lost due to division rounding.
	 * All numbers use uint256 for gas optimization.
	 */
	function getYieldByTime(uint256 investment, uint256 time, Fraction memory yield) public pure returns (uint256) {
		uint256 precision = 10000;
		uint256 yieldPercentage = (time * precision) * 100 / 1 days;
		uint256 oneDayYield = (investment * precision) * yield.numerator / yield.denominator;

		return oneDayYield * yieldPercentage / 100 / precision / precision;
	}

	function spendingAllowed(address _owner, address spender) public view returns (bool) {
        return _spender[_owner][spender];
    }

	function allowSpending(address spender, bool allowed) public {
        _spender[msg.sender][spender] = allowed;
        emit FarmBuckApproval(msg.sender, spender, allowed);
    }

	modifier treeTypeCriteria(TreeType calldata ttype) {
		require(ttype.pricePerLevel.length > 0, "Price wrong: Tree needs to have at least one level.");
		require(ttype.yieldPerLevel.length > 0, "Yield wrong: Tree needs to have at least one level.");
		require(ttype.taxPerLevel.length > 0, "Tax wrong: Tree needs to have at least one level.");
		require(
			ttype.pricePerLevel.length == ttype.yieldPerLevel.length
			&& ttype.yieldPerLevel.length == ttype.taxPerLevel.length,
			"Tree must have same entries on price, yield, and tax per level."
		);
		_;
	}

	function editMultipleTreeTypes(uint256[] calldata indexes, TreeType[] calldata ttypes) external authorized {
		require(indexes.length == ttypes.length, "Array mismatch.");
		for (uint256 i = 0; i < indexes.length; i++) {
			require(
				ttypes[i].pricePerLevel.length > 0 && ttypes[i].yieldPerLevel.length > 0 && ttypes[i].taxPerLevel.length > 0
				&& ttypes[i].pricePerLevel.length == ttypes[i].yieldPerLevel.length
				&& ttypes[i].yieldPerLevel.length == ttypes[i].taxPerLevel.length,
				"Wrong tree configuration. Must have at least one level and same entries for price, yield, and tax."
			);
			treeTypes[indexes[i]] = ttypes[i];
		}
	}

	function editTreeType(uint256 index, TreeType calldata ttype) public authorized treeTypeCriteria(ttype) {
		require(
			ttype.pricePerLevel.length > 0 && ttype.yieldPerLevel.length > 0 && ttype.taxPerLevel.length > 0
			&& ttype.pricePerLevel.length == ttype.yieldPerLevel.length
			&& ttype.yieldPerLevel.length == ttype.taxPerLevel.length,
			"Wrong tree configuration. Must have at least one level and same entries for price, yield, and tax."
		);
		treeTypes[index] = ttype;
	}

	function setBoostsAvailable(bool active) external authorized {
		boostsActive = active;
	}

	function addBoostType(Boost calldata btype) external authorized {
		boostTypes.push(btype);
	}

	function editBoostType(uint256 index, Boost calldata btype) external authorized {
		boostTypes[index] = btype;
	}

	function removeBoostType(uint256 index) external authorized {
		boostTypes[index] = boostTypes[boostTypes.length - 1];
		boostTypes.pop();
	}

	function getTreeType(uint256 plot) external view returns (TreeType memory) {
		return treeTypes[plot];
	}

	/**
	 * @dev Can mint FarmBucks once.
	 */
	function mintPrivateSaleBucks() external authorized {
		require(!privateMinted, "Private sale FarmBucks already minted.");
		unchecked {
			_balances[msg.sender] += privateMintAmount;
			_supply += privateMintAmount;
		}
		privateMinted = true;
	}

	function setPrivateSaleMintAmount(uint256 amount) external authorized {
		require(amount < 10_000_000 ether, "Presale mint amount is limited to a sensible number.");
		privateMintAmount = amount;
	}

	function setRefererAmount(Fraction calldata fr) external authorized {
		refererAmount = fr;
	}

	function setTransferAllowed(bool allow) external authorized {
		_transferAllowed = allow;
	}
}
