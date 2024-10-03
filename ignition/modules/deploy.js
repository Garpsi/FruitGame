const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deploy", (m) => {
    const deploy = m.contract("TreeFarm")

    return { deploy };
})