import { Layout, Text, Page } from '@vercel/examples-ui'
import { Web3Page, Web3PageProps } from '../components/Web3Page'
import { GlobalNav } from '../components/nav/global-nav'
import { ContractManager } from '../utils/contractManager';
import { useState } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';

export const Home: React.VFC<Web3PageProps> = ({ state, setState, contractManager, setContractManager }) => {
    
  return (
    <Page>
      {/* <GlobalNav state={state} setState={setState} /> */}
      <section className="flex flex-col gap-6 ml-48">
        <Text variant="h1">NFT Faucet</Text>
        <Text>
          This faucet allows the user to mint NFTs from the GoerliETH testnet.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-2 ml-48" />

      <section className="flex flex-col ml-48">
        <Web3Page state={state} setState={setState} contractManager={contractManager} setContractManager={setContractManager}/>
      </section>
    </Page>
  )
}

export default Home
