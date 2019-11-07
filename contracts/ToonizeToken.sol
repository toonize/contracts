pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";
import "./Avatars.sol";

contract ToonizeToken is ERC721 {
    using Avatars for Avatars.Avatar;
    address public gateway;
    address private _owner;
    uint256 private _price;
    uint256 private _numberOfAvatars;
    mapping(address => uint256[]) private _tokenIdsOfUser;
    mapping(uint256 => Avatars.Avatar) private _avatarOfTokenId;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AvatarAdded(address to, uint256 tokenId, Avatars.Avatar avatar);

    constructor(address transferGateway, uint256 price) public {
        _owner = msg.sender;
        gateway = transferGateway;
        _price = price;
    }

    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    function name() external pure returns (string memory) {
        return "Toonize";
    }

    function symbol() external pure returns (string memory) {
        return "TOON";
    }
    function tokenURI(uint256) external pure returns (string memory) {
        return "";
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

    function getTokenIdsOf(address user) public view returns (uint256[] memory) {
        return _tokenIdsOfUser[user];
    }

    function getAvatarOf(uint256 tokenId) public view returns (Avatars.Avatar memory) {
        return _avatarOfTokenId[tokenId];
    }

    function addAvatar(address to, Avatars.Avatar memory avatar) public payable {
        require(msg.value == _price, "value is too low");
        require(avatar.isValid(), "avatar not valid");

        _numberOfAvatars += 1;
        uint256 tokenId = _numberOfAvatars;
        _tokenIdsOfUser[to].push(tokenId);
        _avatarOfTokenId[tokenId] = avatar;
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
