import React, {useState} from 'react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'

export function Account({ farmBucks }) {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  const [currency, setCurrency] = useState(farmBucks || 0);

  const displayAddress = address ? `${address.slice(0, 12)}...` : '';

  return (
      <div className="currency__container">
        <div className="address__container">
          <p className="user__address">{displayAddress}</p> {/* Wallet address */}
        </div>
        <button className="menu__btn--remove" onClick={() => disconnect()}>Disconnect</button>
        <div className="currency__info--section">
          <p className="currency__text">FarmBucks</p>
          <p className="currency__number">{currency}</p> {/* Display farm bucks */}
        </div>
        <div className="links">
          <a href="" class="link" target="_blank">
            <i class="link__img fa-solid fa-trash"></i>
          </a>
          <a href="" class="link" target="_blank">
            <i class="link__img fa-solid fa-paperclip"></i>
          </a>
          <a href="" class="link" target="_blank">
            <i class="link__img fa-solid fa-book-open"></i>
          </a>
        </div>
      </div>

      
    // <div>
    //   {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
    //   <button onClick={() => disconnect()}>Disconnect</button>
    // </div>
  )
}