pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract ToonizeToken is Ownable, ERC721Full {
    address public gateway;
    uint256 private _price;
    mapping(address => bytes20[]) private _avatarsOfUser;
    mapping(address => bytes20) private _selectedAvatarOfUser;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AvatarAdded(address user, bytes20 hash);
    event AvatarSelected(address user, bytes20 hash);

    constructor(address transferGateway, uint256 price) public ERC721Full("Toonize", "TOON") {
        gateway = transferGateway;
        _price = price;
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        _price = newPrice;
    }

    function getAvatarsOf(address user) public view returns (bytes20[] memory) {
        return _avatarsOfUser[user];
    }

    function getSelectedAvatarOf(address user) public view returns (bytes20 hash) {
        return _selectedAvatarOfUser[user];
    }

    function addAvatar(bytes20 hash) public payable {
        require(msg.value == _price, "ToonizeToken: price too low");
        require(hash != bytes20(uint160(0)), "ToonizeToken: hash must not be 0");

        _avatarsOfUser[msg.sender].push(hash);
        _selectedAvatarOfUser[msg.sender] = hash;

        emit AvatarAdded(msg.sender, hash);
        emit AvatarSelected(msg.sender, hash);
    }

    function selectAvatar(bytes20 hash) public {
        require(hash != bytes20(uint160(0)), "ToonizeToken: hash must not be 0");
        bool exists = false;
        bytes20[] storage avatars = _avatarsOfUser[msg.sender];
        for (uint256 i = 0; i < avatars.length; i++) {
            if (avatars[i] == hash) {
                exists = true;
            }
        }
        require(exists, "ToonizeToken: hash not exists");
        _selectedAvatarOfUser[msg.sender] = hash;

        emit AvatarSelected(msg.sender, hash);
    }

    function withdraw(address payable recipient) public onlyOwner {
        recipient.transfer(address(this).balance);
    }

    function depositToGateway(uint256 tokenId) public {
        safeTransferFrom(msg.sender, gateway, tokenId);
    }
}
