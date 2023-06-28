import { Text, Button, LoadingDots } from '@vercel/examples-ui'
import { useWeb3Modal } from '@web3modal/react'
import { goerli } from 'wagmi/chains'
import { ContractProps } from './Web3Page'
import { WalletButton } from './WalletButton'
// import { useNetwork, useSwitchNetwork } from 'wagmi'  

export const SwitchNetwork: React.VFC<ContractProps> = ({state}) => {

  const { open, close } = useWeb3Modal()

  return (
    <div className="flex flex-col">
      <Text variant="h2">Connecting to Goerli</Text>
      <div className="mt-2 flex flex-col items-start justify-between">
        <Text>
          This faucet uses the Ethereum test network called Goerli. You must
          set your wallet to use this network before you can mint NFTs.
        </Text>
        <WalletButton state={state}/>
      </div>
    </div>
  )
}
