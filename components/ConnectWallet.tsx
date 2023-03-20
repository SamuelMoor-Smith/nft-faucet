import { Button, Text } from '@vercel/examples-ui'
import React from 'react';
import { MintProps } from './Mint';
import { decideState } from '../helpers/metamask.helpers';

export const ConnectWallet: React.VFC<MintProps> = ({ state, setState}) => {


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
        <div className="mt-12  flex justify-center">
          <Button variant="black" size="lg" onClick={() => decideState(state, setState)}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}
