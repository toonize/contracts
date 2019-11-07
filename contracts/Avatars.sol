pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

library Avatars {
    struct Avatar {
        string description;
        Options options;
        Items items;
    }

    struct Options {
        string face;
        string eyes;
        string betweenEyes;
        string mouth;
        string body;
    }

    struct Items {
        Item face;
        Item hair;
        Item eyebrows;
        Item eyes;
        Item nose;
        Item mouth;
        Item clothes;
        Item body;
        Item background;
        Item outwear;
        Item hat;
        Item glasses;
        Item accessory;
        Item expression;
        Item hand;
        Item balloon;
        Item pet;
        Item goods;
    }

    struct Item {
        string key;
        string color;
        string[] attributes;
    }

    function isValid(Avatars.Avatar memory avatar) public pure returns (bool) {
        return
            !_isStringEmpty(avatar.options.face) &&
            !_isStringEmpty(avatar.options.eyes) &&
            !_isStringEmpty(avatar.options.betweenEyes) &&
            !_isStringEmpty(avatar.options.mouth) &&
            !_isStringEmpty(avatar.options.body) &&
            !_isStringEmpty(avatar.items.face.key) &&
            !_isStringEmpty(avatar.items.hair.key) &&
            !_isStringEmpty(avatar.items.eyebrows.key) &&
            !_isStringEmpty(avatar.items.eyes.key) &&
            !_isStringEmpty(avatar.items.nose.key) &&
            !_isStringEmpty(avatar.items.mouth.key) &&
            !_isStringEmpty(avatar.items.clothes.key) &&
            !_isStringEmpty(avatar.items.body.key) &&
            !_isStringEmpty(avatar.items.background.key);
    }

    function _isStringEmpty(string memory str) private pure returns (bool) {
        return bytes(str).length == 0;
    }
}
