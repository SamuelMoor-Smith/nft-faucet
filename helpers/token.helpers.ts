import { web3 } from '../pages/_app';
import { contractAddr } from './constant.helpers';
import { AbiItem } from 'web3-utils';
import contractABI from './contractABI.json';

export async function displayTokenSVG(tokenId: Number | null): Promise<string | null> {

    if (!tokenId) {
        alert("No tokenId was entered");
        return null;
    }

    const contract = new web3.eth.Contract((contractABI as AbiItem[]), contractAddr);

    try {
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
