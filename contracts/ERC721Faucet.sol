// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Faucet is ERC721, Ownable {
    address public feeAddress = 0xD8Ea779b8FFC1096CA422D40588C4c0641709890; // Goerli Alchemy faucet address 
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
        payable(feeAddress).transfer(msg.value); // Transfer ETH fee to faucet
    }

    function withdraw() external onlyOwner {
        payable(feeAddress).transfer(address(this).balance); // Transfer any ETH in contract to faucet
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory baseURI = super.tokenURI(tokenId);
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, getSVG(tokenId))) : getSVG(tokenId);
    }

    function getSVG(uint256 tokenId) private pure returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(tokenId));
        string memory svg = "<svg width='100' height='100'>";
        uint256 x;
        uint256 y;
        for (uint i = 0; i < 16; i++) {
            x = (i % 4) * 25;
            y = (i / 4) * 25;
            svg = string(abi.encodePacked(
                svg,
                "<rect x='", toString(x), "' y='", toString(y),
                "' width='25' height='25' fill='", toColor(bytes4(hash[i])), "'/>"
            ));
        }
        svg = string(abi.encodePacked(svg, "</svg>"));
        return svg;
    }

    function toColor(bytes32 hash) private pure returns (string memory) {
        uint256 red = uint8(hash[0]);
        uint256 green = uint8(hash[1]);
        uint256 blue = uint8(hash[2]);
        return string(abi.encodePacked(
            "#", toHex(red), toHex(green), toHex(blue)
        ));
    }

    function toString(uint256 value) private pure returns (string memory) {
        bytes memory data = new bytes(32);
        for (uint256 i = 0; i < 32; i++) {
            data[i] = bytes1(uint8(48 + uint8((value / (10**(31 - i))) % 10)));
        }
        return string(data);
    }

    function toHex(uint256 value) private pure returns (string memory) {
        bytes memory data = new bytes(2);
        data[0] = _toChar(uint8(value >> 4 & 0xF));
        data[1] = _toChar(uint8(value & 0xF));
        return string(data);
    }

    function _toChar(uint8 value) private pure returns (bytes1) {
        if (value < 10) {
            return bytes1(uint8(bytes1('0')) + value);
        } else {
            return bytes1(uint8(bytes1('a')) + value - 10);
        }
    }
}
