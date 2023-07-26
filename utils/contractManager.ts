import { web3 } from "../pages/_app";
import { contractAddr } from "./constants";
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
        await this.setTokenCount();

        for (let tokenId = 0; tokenId < Number(this.tokenCount); tokenId++) {
          let tokenURI = await this.contract.methods.tokenURI(tokenId).call();
          let owner = await this.contract.methods.ownerOf(tokenId).call();

          const token: Token = { id: tokenId, owner: owner, svg: tokenURI };
          this.allTokens.set(tokenId, token);
        }

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
