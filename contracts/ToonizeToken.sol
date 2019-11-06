pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "./Avatars.sol";

contract ToonizeToken is ERC721Full {
    address private _owner;
    using Avatars for Avatars.Avatar;
    address public gateway;
    uint256 private _price;
    mapping(address => Avatars.Avatar[]) private _avatarsOfUser;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AvatarAdded(address to, uint256 tokenId, Avatars.Avatar avatar);

    constructor(address transferGateway, uint256 price) public ERC721Full("Toonize", "TOON") {
        _owner = msg.sender;
        gateway = transferGateway;
        _price = price;
    }

    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    function getAvatarsOf(address user) public view returns (Avatars.Avatar[] memory) {
        return _avatarsOfUser[user];
    }

    function addAvatar(address to, Avatars.Avatar memory avatar) public payable {
        require(msg.value == _price, "value is too low");
        require(avatar.isValid(), "avatar not valid");

        _avatarsOfUser[to].push(avatar);

        uint256 tokenId = totalSupply();
        _mint(to, tokenId);

        emit AvatarAdded(to, tokenId, avatar);
    }

    function withdraw(address payable recipient) public onlyOwner {
        recipient.transfer(address(this).balance);
    }

    function depositToGateway(uint256 tokenId) public {
        safeTransferFrom(msg.sender, gateway, tokenId);
    }
}
