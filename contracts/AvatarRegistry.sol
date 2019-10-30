pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract AvatarRegistry is Ownable {
    mapping(address => bytes20[]) private _avatarsOfAccount;
    mapping(address => int256) private _selectionOfAccount;
    mapping(bytes20 => mapping(string => bytes)) private _attributesOfAvatar;
    address[] private _accounts;
    uint256 private _price;

    event AvatarAdded(address account, bytes20 hash);

    event AvatarSelected(address account, bytes20 hash);

    event AttributeSet(bytes20 hash, string key, bytes value);

    constructor(uint256 price) public {
        _price = price;
    }

    function getNumberOfAvatarsOf(address account) public view returns (uint256 numberOfAvatars) {
        return _avatarsOfAccount[account].length;
    }

    function getAvatarsOf(address account) public view returns (bytes20[] memory hashes) {
        return _avatarsOfAccount[account];
    }

    function getSelectedAvatarOf(address account) public view returns (bytes20 hash) {
        int256 selection = _selectionOfAccount[account];
        return _avatarsOfAccount[account].length == 0 ? bytes20(0) : _avatarsOfAccount[account][uint256(selection)];
    }

    function accountOfAvatar(bytes20 hash) public view returns (address) {
        for (uint256 i = 0; i < _accounts.length; i++) {
            address account = _accounts[i];
            bytes20[] storage hashes = _avatarsOfAccount[account];
            for (uint256 j = 0; j < hashes.length; j++) {
                if (hashes[j] == hash) {
                    return account;
                }
            }
        }
        return address(uint160(0));
    }

    function addAvatar(bytes20 hash) public payable {
        require(msg.value == _price);
        require(hash != bytes20(uint160(0)));

        uint256 index = _avatarsOfAccount[msg.sender].length;
        _avatarsOfAccount[msg.sender].length += 1;
        _avatarsOfAccount[msg.sender][index] = hash;
        _selectionOfAccount[msg.sender] = int256(index);
        if (!_accountExists(msg.sender)) {
            _accounts.push(msg.sender);
        }

        emit AvatarAdded(msg.sender, hash);
        emit AvatarSelected(msg.sender, hash);
    }

    function selectAvatar(bytes20 hash) public {
        int256 index = _getIndexOfAvatar(hash);
        require(index >= 0);
        _selectionOfAccount[msg.sender] = index;

        emit AvatarSelected(msg.sender, hash);
    }

    function setAttribute(bytes20 hash, string memory key, bytes memory value) public {
        require(_getIndexOfAvatar(hash) >= 0);
        _attributesOfAvatar[hash][key] = value;
    }

    function getAttribute(bytes20 hash, string memory key) public view returns (bytes memory value) {
        return _attributesOfAvatar[hash][key];
    }

    function _accountExists(address account) private view returns (bool) {
        for (uint256 i = 0; i < _accounts.length; i++) {
            if (_accounts[i] == account) {
                return true;
            }
        }
        return false;
    }

    function _getIndexOfAvatar(bytes20 hash) private view returns (int256) {
        bytes20[] storage hashes = _avatarsOfAccount[msg.sender];
        int256 index = -1;
        for (uint256 i = 0; i < hashes.length; i++) {
            if (hashes[i] == hash) {
                return int256(i);
            }
        }
        return index;
    }

}
