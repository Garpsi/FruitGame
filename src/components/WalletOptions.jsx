import React from 'react';
import { Connector, useConnect } from 'wagmi'
import metamaskImg from '../assets/metamask.png';
import walletConnectImg from '../assets/walletconnect.png';

const connectorImages = {
  MetaMask: metamaskImg,
  WalletConnect: walletConnectImg,
};

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
      <WalletOption
        key={connector.uid}
        connector={connector}
        onClick={() => connect({ connector })}
      />
  ));


};

function WalletOption({connector, onClick}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  console.log(connector.name)

  return (
    <button class="btn__login" disabled={!ready} onClick={onClick}>
      <img class="btn__login--img" src={connectorImages[connector.name]} alt="" />
    </button>
  )
}