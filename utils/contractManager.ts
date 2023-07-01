import { web3 } from "../pages/_app";
import { contractAddr, COVALENT_API_KEY, COVALENT_API_URL, CHAIN_ID } from "./constants";
import contractABI from "../contracts/contractABI.json";
import {Modules } from 'web3'
import Web3 from "web3";
import { Dispatch, SetStateAction } from "react";
import { Chain, useNetwork } from "wagmi";

export interface Token {
  id: Number;
  owner: string;
  svg: string;
}

export class ContractManager {
  private contract: any;
  private setLoadingTokens;
  public chain;
  public tokenCount: Number | null = null;
  public allTokens: Map<number, Token> = new Map();

  constructor(
    setLoadingTokens: Dispatch<SetStateAction<boolean>>,
    chain:
      | (Chain & {
          unsupported?: boolean | undefined;
        })
      | undefined
  ) {
    this.contract = new web3.eth.Contract(
      contractABI as any,
      contractAddr
    );
    this.chain = chain;
    this.setLoadingTokens = setLoadingTokens;
    this.setAllTokens();
  }

  private async setTokenCount() {
    this.tokenCount = await this.contract.methods.tokenCount().call();
  }

  async setAllTokens() {
    this.setLoadingTokens(true);
  
    console.log(this.chain, !this.chain?.unsupported)
  
    if (this.chain && !this.chain?.unsupported) {
      try {
        console.log("loading")
  
        // Call the AWS Lambda function and get the response
        const response = await fetch('https://pyoxnv6yca.execute-api.us-east-2.amazonaws.com/loadTokens');
  
        console.log(response)
        // If the response was not ok, throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("response ok")
  
        // Get the data from the response
        const data = await response.json();

        console.log(data)
  
        // If there is an error in the data, throw it
        if (data.error) {
          throw new Error(data.error);
        }
  
        // Set the tokens
        this.allTokens = new Map(data.tokens.map((token: { id: any; }) => [token.id, token]));
  
        this.setLoadingTokens(false);
      } catch (error) {
        alert(`Error retrieving tokens: ${error}`);
      }
    }
  }  

  async handleMint(numTokens: any, setNumTokens: any) {
    try {
      // Send the transaction
      await this.contract.methods.mintNTokens(numTokens).send({
        from: await web3.eth.getCoinbase(),
        value: numTokens * 10 ** 14,
      });

      // Transaction successful
      alert(`Successfully minted ${numTokens} tokens!`);
      setNumTokens(0);

      this.setAllTokens();
    } catch (err) {
      // Transaction failed
      alert(`Not enough ETH to mint tokens`);
    }
  }

  displayTokenSVG(tokenId: number | null): string | null {
    if (tokenId === null || tokenId === undefined) {
      alert("No tokenId was entered");
      return null;
    }

    if (!this.allTokens.has(tokenId)) {
      alert("Token id not available");
      return null;
    }

    const svg = this.allTokens.get(tokenId)!.svg;

    if (!svg.startsWith("<svg")) {
      alert("SVG data not found in token URI");
      return null;
    }

    return svg;
  }
}
