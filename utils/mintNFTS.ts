import { web3 } from '../pages/_app'
import { contractAddr } from './constants'
import { AbiItem } from 'web3-utils'
import contractABI from './contractABI.json';

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