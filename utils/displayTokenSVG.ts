import { web3 } from '../pages/_app';
import { contractAddr } from './constants';
import { AbiItem } from 'web3-utils';
import contractABI from './contractABI.json';

export async function displayTokenSVG(tokenId: Number | null): Promise<string | null> {

    if (tokenId === null || tokenId === undefined) {
        alert("No tokenId was entered");
        return null;
    }    

    const contract = new web3.eth.Contract((contractABI as AbiItem[]), contractAddr);

    try {
        // let tokenCount = await contract.methods.tokenCount().call()
        // for (let tokenId = 0; tokenId < tokenCount; tokenId++) {
        //     let tokenURI = await contract.methods.tokenURI(tokenId).call();
        //     let owner = await contract.methods.ownerOf(tokenId).call();
        //   }
        const svg = await contract.methods.tokenURI(tokenId).call();

        if (svg.startsWith("<svg")) {
            return svg;
        } else {
            alert("SVG data not found in token URI");
        }
    } catch (error) {
        alert(`Error retrieving token URI: ${error}`);
    }

    return null;
}
