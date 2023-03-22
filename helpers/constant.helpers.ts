type SupportedNetworks = "0x1" | "0x4" | "0x5"

// this example would work on ethereum mainnet but Rinkeby is used to showcase. For main network change to "0x1"
export const NETWORK_ID = "0x5"

export const ChainLabelMap: Record<SupportedNetworks, string> = {
  "0x1": 'Ethereum',
  "0x4": 'Rinkeby',
  "0x5": 'Goerli',
}

export const currentChainLabel = ChainLabelMap[NETWORK_ID]

export const contractAddr = '0xe7db0c69f359d5c18712ba7674ca4bd32c61bdba';
