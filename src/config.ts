import { http, createConfig } from 'wagmi'
import { base, bscTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = '9f2835db7c879e6e306273f80eb5f909'

export const config = createConfig({
  chains: [bscTestnet, base],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [bscTestnet.id]: http(),
    [base.id]: http(),
  },
})