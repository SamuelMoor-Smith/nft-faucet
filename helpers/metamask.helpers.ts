import { NETWORK_ID } from './constant.helpers'
import { MintState } from '../components/Mint';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { web3 } from '../pages/_app'
import { contractAddr } from './constant.helpers'
import { AbiItem } from 'web3-utils'
import contractABI from './contractABI.json';

export const checkMetamaskInstalled = () => {
    if (typeof window.ethereum === 'undefined') {
        alert("Metamask is not installed")
        return null
    }
    return window.ethereum
}

export const checkEthereumWindowConnected = (ethereum: MetaMaskInpageProvider) => {
    if (!ethereum.isConnected()) {
        alert("Ethereum window is not connected")
        return false
    }
    return true
}

export const getAccounts = async () => {
    // Get the user's accounts from MetaMask
    return await window.ethereum!.request({ method: 'eth_requestAccounts' });
}

export const handleSwitchNetwork = async (state: MintState, setState: any, setLoading: any) => {
    try {
        setLoading(true)
        const ethereum = checkMetamaskInstalled()
        if (ethereum) {
            
            if (ethereum.chainId !== NETWORK_ID) {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: NETWORK_ID }],
                });
            } else {
                setState(MintState.Upload)
            }

        } else {
            setState(MintState.Connect)
        }
    } catch (error) {
        setLoading(false)
        alert("Could not mint the tokens")
    } finally {
        setLoading(false)
    }
  }

export const decideState = async (state: MintState, setState: any) => {

    try {

        const ethereum = checkMetamaskInstalled()
        if (ethereum) {

            if (checkEthereumWindowConnected(ethereum)) {

                // Get the user's accounts from MetaMask
                const accounts = getAccounts();

                // Do something with the accounts, such as display them on the UI
                console.log('Connected to MetaMask:', accounts);

                // Check if its the right testNet
                const chainId = ethereum.chainId;
                
                if (chainId !== NETWORK_ID) {
                    setState(MintState.ConfirmNetwork)
                } else { // If so, set to upload screen
                    setState(MintState.Upload)
                }
            } else {
                setState(MintState.Connect)
            }

        } else {
            setState(MintState.Connect)
        }

    } catch (error) {
        alert(`Could not load page`);
    }
};

export async function handleMint(numTokens: any, setNumTokens: any) {

    const contract = new web3.eth.Contract((contractABI as AbiItem[]), contractAddr);

    try {
      // Send the transaction
      await contract.methods.mintNTokens(numTokens).send({
        from: await web3.eth.getCoinbase(),
        value: numTokens * 10**14,
      });

      // Transaction successful
      alert(`Successfully minted ${numTokens} tokens!`);
      setNumTokens(0);

    } catch (err) {
      // Transaction failed
      alert(`Not enough ETH to mint tokens`);
    }
  }