import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import Home from '.'

import { getLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

import Web3 from 'web3';
export const web3 = new Web3(Web3.givenProvider);

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
      title="mint-nft"
      path="solutions/mint-nft"
      description="How to mint an NFT"
    >
      <Home/>
    </Layout>
  )
}

export default App
