import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import Home from '.'
import { GlobalNav } from '../components/nav/global-nav'

import { getLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

import Web3 from 'web3';
import { useState } from 'react'
import { Web3State } from '../components/Web3Page'
import { ChakraProvider } from '@chakra-ui/react'
export const web3 = new Web3(Web3.givenProvider);

function App({ Component, pageProps }: AppProps) {

  const [state, setState] = useState<Web3State>(Web3State.Loading)

  // useEffect(() => {
  //   const initializeState = async () => {
  //     await decideState(state, setState);
  //   };

  //   initializeState();
  // }, [state]);

  return (
    <ChakraProvider>
      <GlobalNav state={state} setState={setState} />
      <Home state={state} setState={setState}/>
    </ChakraProvider>
  )
}

export default App
