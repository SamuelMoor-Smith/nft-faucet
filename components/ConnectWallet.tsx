import { Button, Text } from '@vercel/examples-ui'
import React from 'react';
import { MintProps, MintState } from './Mint';
import { NETWORK_ID } from '../helpers/constant.helpers'
import { web3 } from '../pages/_app'

export const ConnectWallet: React.VFC<MintProps> = ({ state, setState}) => {

  const handleConnect = async () => {
    try {

      if (window.ethereum && window.ethereum.isConnected()) {
        // Get the user's accounts from MetaMask
        const accounts = await web3.eth.getAccounts();

        // Do something with the accounts, such as display them on the UI
        console.log('Connected to MetaMask:', accounts);

        // Check if its the right testNet
        const chainId = window.ethereum.chainId;
        console.log(chainId)
        if (chainId !== NETWORK_ID) {
          setState(MintState.ConfirmNetwork)
        } else { // If so, set to upload screen
          setState(MintState.Upload)
        }
      } else {
        console.log('Not connected to MetaMask');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          Metamask sometimes presents some UX issues where it will not open
          properly. It is good to guide users trough this process to keep
          accessibility in mind.
        </Text>
        <div className="mt-12  flex justify-center">
          <Button variant="black" size="lg" onClick={handleConnect}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}
