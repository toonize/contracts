pragma solidity ^0.5.11;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract LoomToonizeToken is ERC721Full {
    address public gateway;

    constructor(address _gateway) public ERC721Full("Toonize", "TOON") {
        gateway = _gateway;
    }

    function mintToGateway(uint256 tokenId) public {
        require(msg.sender == gateway);
        _mint(gateway, tokenId);
    }
}
