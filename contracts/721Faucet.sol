// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract 721Faucet is ERC721, Ownable {
    uint256 public tokenCount;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mintNTokens(uint256 n) external payable {
        uint256 ethRequired = n * 10**14; // 0.0001 ETH per token
        require(msg.value >= ethRequired, "Insufficient ETH sent.");
        for (uint256 i = 0; i < n; i++) {
            _safeMint(msg.sender, tokenCount);
            tokenCount++;
        }
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
