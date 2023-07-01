import { Text, Page } from '@vercel/examples-ui'
import { Web3Page, Web3PageProps } from '../components/Web3Page'

// import 'bootstrap/dist/css/bootstrap.min.css';

export const Home: React.VFC<Web3PageProps> = ({ state, setState, contractManager, setContractManager }) => {
    
  return (
    <Page>
      {/* <GlobalNav state={state} setState={setState} /> */}
      <section className="flex flex-col gap-6">
        <Text variant="h1">NFT Faucet</Text>
        <Text>
          This faucet allows the user to mint NFTs from the GoerliETH testnet.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-2" />

      <section className="flex flex-col">
        <Web3Page state={state} setState={setState} contractManager={contractManager} setContractManager={setContractManager}/>
      </section>
    </Page>
  )
}

export default Home
