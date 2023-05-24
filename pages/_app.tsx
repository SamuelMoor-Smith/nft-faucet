import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import Home from '.'

import { getLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

import Web3 from 'web3';
import { useEffect, useState } from 'react'
import { decideState } from '../helpers/metamask.helpers'
import { MintState } from '../components/Mint'
export const web3 = new Web3(Web3.givenProvider);

function App({ Component, pageProps }: AppProps) {

  const [state, setState] = useState<MintState>(MintState.Connect)

  useEffect(() => {
    const initializeState = async () => {
      await decideState(state, setState);
    };

    initializeState();
  }, [state]);

  return (
    <Home state={state} setState={setState}/>
  )
}

export default App
