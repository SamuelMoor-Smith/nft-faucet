import { useState, useEffect } from 'react'
import { NETWORK_ID } from '../helpers/constant.helpers'

import { Button, Text, LoadingDots } from '@vercel/examples-ui'
import { MintProps, MintState } from './Mint'

export const SwitchNetwork: React.VFC<MintProps> = ({ state, setState }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      const ethereum = window.ethereum

      const handleChainChanged = async (...args: unknown[]) => {
        if (args[0] === NETWORK_ID) {
          setState(MintState.Upload)
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
    }
  }, [])

  const handleSwitchNetwork = async () => {
    setLoading(true)
    try {
      if (window.ethereum) {
        const chainId = window.ethereum.chainId;
        if (chainId !== NETWORK_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_ID }],
          });
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Text variant="h2">Connecting to Rinkeby</Text>
      <div className="mt-2 flex flex-col items-start justify-between">
        <Text>
          This example uses the Ethereum test network called Rinkeby. You must
          set your wallet to use this network before you can mint an NFT.
        </Text>
        <div className="mt-5 sm:flex-shrink-0 sm:flex sm:items-center">
          <Button onClick={handleSwitchNetwork} size="lg" variant="black">
            {loading ? <LoadingDots /> : 'Switch to Rinkeby'}
          </Button>
        </div>
      </div>
    </div>
  )
}
