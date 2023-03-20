import { NETWORK_ID } from './constant.helpers'
import { web3 } from '../pages/_app'
import { MintState } from '../components/Mint';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { setLazyProp } from 'next/dist/server/api-utils';

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

// export const temp = () => {
//     if (window.ethereum) {
//         const ethereum = window.ethereum
  
//         const handleChainChanged = async (...args: unknown[]) => {
//           if (args[0] === NETWORK_ID) {
//             setState(MintState.Upload)
//           }
//         }
  
//         ethereum.on('chainChanged', handleChainChanged)
//       }
// }

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
        alert(error)
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
        alert(error);
    }
};