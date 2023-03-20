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
    <Home/>
  )
}

export default App
