pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract AvatarRegistry is Ownable {
    struct Avatar {
        Variables variables;
        Item[] items;
    }

    struct Variables {
        string faceLength;
        string eyeSize;
        string eyeDistance;
        string mouthSize;
        string body;
    }

    struct Item {
        string categoryId;
        string id;
        string color;
        string[] attributes;
    }

    mapping(address => Avatar[]) private _avatarOfUser;
    mapping(address => int256) private _selectionOfUser;
    uint256 private _price;

    constructor(uint256 price) public {
        _price = price;
    }

    function getNumberOfAvatarsOf(address who) public view returns (uint256) {
        return _avatarOfUser[who].length;
    }

    function getAvatarsOf(address who) public view returns (Avatar[] memory) {
        return _avatarOfUser[who];
    }

    function getSelectionOf(address who) public view returns (int256) {
        return _avatarOfUser[who].length == 0 ? -1 : _selectionOfUser[who];
    }

    function addAvatar(Avatar memory avatar) public payable {
        require(msg.value == _price);

        uint256 index = _avatarOfUser[msg.sender].length;
        _avatarOfUser[msg.sender].length += 1;
        _avatarOfUser[msg.sender][index].variables = avatar.variables;
        for (uint256 i = 0; i < avatar.items.length; i++) {
            _avatarOfUser[msg.sender][index].items.push(avatar.items[i]);
        }
        _selectionOfUser[msg.sender] = int256(index);
    }

    function selectAvatar(int256 index) public {
        require(index >= 0 && uint256(index) < _avatarOfUser[msg.sender].length);
        _selectionOfUser[msg.sender] = index;
    }
}
