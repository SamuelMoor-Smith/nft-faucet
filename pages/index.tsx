import { Layout, Text, Page } from '@vercel/examples-ui'
import { Mint } from '../components/Mint'

import { useState } from 'react'
import { MintState } from '../components/Mint'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [state, setState] = useState<MintState>(MintState.Connect)
  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">NFT Faucet</Text>
        <Text>
          This faucet allows the user to mint NFTs from the GoerliETH testnet.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-6" />

      <section className="flex flex-col ">
        <Mint state={state} setState={setState} />
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
