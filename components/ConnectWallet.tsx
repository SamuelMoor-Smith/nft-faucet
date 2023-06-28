import { Button, Text, LoadingDots } from '@vercel/examples-ui'
import React from 'react';

import { Web3Button } from '@web3modal/react'
import { useWeb3Modal } from '@web3modal/react'
import { WalletButton } from './WalletButton';
import { ContractProps } from './Web3Page';

export const ConnectWallet: React.VFC<ContractProps> = ({state}) => {

  const { open, close } = useWeb3Modal()

  return (
    <div className="flex flex-col ">
      <Text variant="h2">Connecting your wallet</Text>
      <div className="mt-2 items-start justify-between">
        <Text className="my-6">
          In order to mint your NFTs you must connect your wallet using the{' '}
          <a
            className="underline"
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
          >
            Metamask extension.
          </a>{' '}
        </Text>
        <Text>
          If you do not want to install metamask via the link above, we will be soon adding implementations for other web3 providers.
        </Text>
        <WalletButton state={state}/>
      </div>
    </div>
  )
}
