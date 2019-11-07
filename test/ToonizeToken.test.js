const Avatars = artifacts.require("Avatars");
const ToonizeToken = artifacts.require("ToonizeToken");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

require("dotenv").config();

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh
const EMPTY_ITEM = {
    key: "",
    color: "",
    attributes: []
};
const AVATAR_1 = {
    description: "TEST",
    options: {
        face: "short",
        eyes: "big",
        betweenEyes: "medium",
        mouth: "big",
        body: "default"
    },
    items: {
        face: {
            key: "face-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        hair: {
            key: "hair-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        eyebrows: {
            key: "eyebrows-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        eyes: {
            key: "eyes-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        nose: {
            key: "nose-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        mouth: {
            key: "mouth-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        clothes: {
            key: "clothes-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        body: {
            key: "body-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        background: {
            key: "background-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        outwear: {
            key: "outwear-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        hat: {
            key: "hat-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        glasses: {
            key: "glasses-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        accessory: {
            key: "accessory-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        expression: {
            key: "expression-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        hand: {
            key: "hand-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        balloon: {
            key: "balloon-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        pet: {
            key: "pet-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        goods: {
            key: "goods-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        }
    }
};
const AVATAR_2 = {
    description: "TEST",
    options: {
        face: "medium",
        eyes: "medium",
        betweenEyes: "medium",
        mouth: "medium",
        body: "default"
    },
    items: {
        face: {
            key: "face001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        },
        hair: EMPTY_ITEM,
        eyebrows: EMPTY_ITEM,
        eyes: EMPTY_ITEM,
        nose: EMPTY_ITEM,
        mouth: EMPTY_ITEM,
        clothes: EMPTY_ITEM,
        body: EMPTY_ITEM,
        background: EMPTY_ITEM,
        outwear: EMPTY_ITEM,
        hat: EMPTY_ITEM,
        glasses: EMPTY_ITEM,
        accessory: EMPTY_ITEM,
        expression: EMPTY_ITEM,
        hand: EMPTY_ITEM,
        balloon: EMPTY_ITEM,
        pet: EMPTY_ITEM,
        goods: EMPTY_ITEM,
    }
};

contract("ToonizeToken", ([, user]) => {
    it("should add avatar", async () => {
        const lib = await Avatars.new();
        await ToonizeToken.link("Avatars", lib.address);
        const token = await ToonizeToken.new("0x0000000000000000000000000000000000000000", PRICE);
        await token.addAvatar(user, AVATAR_1, { from: user, value: PRICE });
        const tokenIds = await token.getTokenIdsOf(user);
        expect(tokenIds.length).to.be.equal(1);
        console.log(await token.getAvatarOf(1));
        expectRevert(token.addAvatar(user, AVATAR_2, { from: user, value: PRICE }), "avatar not valid");

        expect(await web3.eth.getBalance(token.address)).to.be.bignumber.equal(PRICE);
        await token.withdraw(user);
        expect(await web3.eth.getBalance(token.address)).to.be.bignumber.equal(new BN(0));
    });
});
