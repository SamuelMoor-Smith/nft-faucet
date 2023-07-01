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
import { ContractManager } from '../utils/contractManager'
export const web3 = new Web3(Web3.givenProvider);

function App({ Component, pageProps }: AppProps) {

  const [state, setState] = useState<Web3State>(Web3State.Loading)

  // Initialize contractManager as a state variable to persist it across re-renders
  const [contractManager, setContractManager] =
    useState<ContractManager | null>(null);

  // useEffect(() => {
  //   const initializeState = async () => {
  //     await decideState(state, setState);
  //   };

  //   initializeState();
  // }, [state]);

  return (
    <ChakraProvider>
       <div>
        <div className="bg-gray-1100 overflow-y-scroll pb-36">
          <GlobalNav state={state} setState={setState} contractManager={contractManager} setContractManager={setContractManager} />

          <div className="lg:pl-72">
            <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
              {/* <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                <div className="rounded-lg bg-black">
                  <AddressBar />
                </div>
              </div> */}

              <div className="rounded-lg p-px">
                <div className="rounded-lg p-3.5 lg:p-6">
                  <Home state={state} setState={setState} contractManager={contractManager} setContractManager={setContractManager} />
                </div>
              </div>
              {/* <Byline className="fixed sm:hidden" /> */}
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
