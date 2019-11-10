pragma solidity ^0.5.11;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract LoomToonizeToken is ERC721Full {
    address public gateway;
    mapping(address => bytes32) private _selectedAvatarOfUser;

    event AvatarSelected(address user, bytes32 hash);

    constructor(address _gateway) public ERC721Full("Toonize", "TOON") {
        gateway = _gateway;
    }

    function getAvatarsOf(address user) public view returns (bytes32[] memory) {
        uint256[] storage tokenIds = _tokensOfOwner(user);
        bytes32[] memory avatars = new bytes32[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            avatars[i] = bytes32(tokenIds[i]);
        }
        return avatars;
    }

    function getSelectedAvatarOf(address user) public view returns (bytes32 hash) {
        return _selectedAvatarOfUser[user];
    }

    function selectAvatar(bytes32 hash) public {
        require(hash != bytes32(uint256(0)), "LoomToonizeToken: hash must not be 0");
        bool exists = false;
        uint256[] storage tokenIds = _tokensOfOwner(msg.sender);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (tokenIds[i] == uint256(bytes32(hash))) {
                exists = true;
            }
        }
        require(exists, "LoomToonizeToken: hash not exists");
        _selectedAvatarOfUser[msg.sender] = hash;

        emit AvatarSelected(msg.sender, hash);
    }

    function mintToGateway(uint256 tokenId) public {
        require(msg.sender == gateway);
        _mint(gateway, tokenId);
    }
}
