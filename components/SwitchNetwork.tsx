import { useState, useEffect } from 'react'
import { handleSwitchNetwork } from '../helpers/metamask.helpers'

import { Button, Text, LoadingDots } from '@vercel/examples-ui'
import { MintProps } from './Mint'

export const SwitchNetwork: React.VFC<MintProps> = ({ state, setState }) => {


  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-col">
      <Text variant="h2">Connecting to Rinkeby</Text>
      <div className="mt-2 flex flex-col items-start justify-between">
        <Text>
          This faucet uses the Ethereum test network called Goerli. You must
          set your wallet to use this network before you can mint NFTs.
        </Text>
        <div className="mt-5 sm:flex-shrink-0 sm:flex sm:items-center">
          <Button onClick={() => handleSwitchNetwork(state, setState, setLoading)} size="lg" variant="black">
            {loading ? <LoadingDots /> : 'Switch to Goerli'}
          </Button>
        </div>
      </div>
    </div>
  )
}
