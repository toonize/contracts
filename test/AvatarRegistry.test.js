const ToonizeToken = artifacts.require("ToonizeToken");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

require("dotenv").config();

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh
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
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        hair: {
            key: "hair-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        eyebrows: {
            key: "eyebrows-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        eyes: {
            key: "eyes-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        nose: {
            key: "nose-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        mouth: {
            key: "mouth-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        clothes: {
            key: "clothes-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        body: {
            key: "body-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        background: {
            key: "background-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        outwear: {
            key: "outwear-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        hat: {
            key: "hat-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        glasses: {
            key: "glasses-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        accessory: {
            key: "accessory-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        expression: {
            key: "expression-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        hand: {
            key: "hand-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        balloon: {
            key: "balloon-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        pet: {
            key: "pet-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        },
        goods: {
            key: "goods-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
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
        eye: {
            key: "eye-001", // unique string
            color: "#f8f3db" // color code in string
            // attributes: []
        }
    }
};

contract("ToonizeToken", ([, user]) => {
    it("should add avatar", async () => {
        const registry = await ToonizeToken.new(process.env.ETHEREUM_GATEWAY, PRICE);
        await registry.addAvatar(user, AVATAR_1, { from: user, value: PRICE });
        expect((await registry.getAvatarsOf(user)).length).to.be.equal(1);
        expectRevert(registry.addAvatar(AVATAR_2, { from: user, value: PRICE }), "avatar not valid");
    });
});
