import { ConnectWallet } from "./ConnectWallet";
import { SwitchNetwork } from "./SwitchNetwork";
import { MintNFTs } from "./MintNFTs";
import { ViewNFTs } from "./ViewNFTs";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";

import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractManager } from "../utils/contractManager";

const chains = [goerli];
const projectId = "ea369b37d41634ed8ea15d352dd68413";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export enum Web3State {
  Loading,
  WalletNotConnected,
  WrongNetwork,
  MintNFTs,
  ViewNFTs,
}

export interface ContractProps {
  contractManager?: ContractManager | null;
  loadingTokens?: boolean;
  state: Web3State
}
export interface Web3PageProps {
  state: Web3State;
  setState: React.Dispatch<React.SetStateAction<Web3State>>;
  contractManager?: ContractManager | null,
  setContractManager?: Dispatch<SetStateAction<ContractManager | null>>
}

export const Web3Page: React.VFC<Web3PageProps> = ({ state, setState, contractManager, setContractManager }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();
  const [loadingTokens, setLoadingTokens] = useState(true);

    useEffect(() => {
      console.log(contractManager)
      if (
        address && 
        chain && 
        !chain.unsupported && 
        !isDisconnected
      ) {
        // Wallet is connected and we are on the right network
        // Initialize ContractManager
        console.log("creating contract manager", chain)
        const cm = new ContractManager(setLoadingTokens, chain);
        setContractManager!(cm); // Save ContractManager instance to state
      } else if (
        contractManager &&
        (isDisconnected || (chain && chain.unsupported))
      ) {
        // Wallet is disconnected or we are on the wrong network
        // Handle the disconnection or wrong network here
        // For example, you could clear the contractManager state
        setContractManager!(null);
      }
    }, [address, isConnecting, isDisconnected, chain, chains]); // This hook will run every time the address, isConnecting, isDisconnected, chain, or chains change
    

  useEffect(() => {
    console.log(address)
    if (address == null || address == undefined) {
      setState(Web3State.WalletNotConnected);
    } else if (!chain || chain!.unsupported || !contractManager) {
      setState(Web3State.WrongNetwork);
    } else if (address && state == Web3State.ViewNFTs) {
      return;
    } else {
      setState(Web3State.MintNFTs);
    }
  }, [address, isConnecting, isDisconnected, chain, chains, contractManager]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="inline-block align-bottom text-left overflow-hidden  transform transition-all sm:my-4 sm:align-middle  ">
        {/* {(address == null || address == undefined) && <ConnectWallet state={state} setState={setState} />} */}

        {state === Web3State.WalletNotConnected && <ConnectWallet state={state} />}

        {state === Web3State.WrongNetwork && <SwitchNetwork state={state} />}

        {state === Web3State.MintNFTs && (
          <MintNFTs contractManager={contractManager} state={state} />
        )}

        {state === Web3State.ViewNFTs && (
          <ViewNFTs
            contractManager={contractManager}
            loadingTokens={loadingTokens}
            state={state}
          />
        )}
      </div>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
        defaultChain={goerli}
      />
    </WagmiConfig>
  );
};
