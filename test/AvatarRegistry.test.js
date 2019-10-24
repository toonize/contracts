const AvatarRegistry = artifacts.require("AvatarRegistry");
const {BN} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh
const AVATAR_1 = {
    variables: {
        faceLength: "short",
        eyeSize: "big",
        eyeDistance: "medium",
        mouthSize: "big",
        body: "default"
    },
    items: [
        {
            categoryId: "face",
            id: "face-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        }
    ]
};
const AVATAR_2 = {
    variables: {
        faceLength: "medium",
        eyeSize: "medium",
        eyeDistance: "medium",
        mouthSize: "medium",
        body: "default"
    },
    items: [
        {
            categoryId: "eye",
            id: "eye-001", // unique string
            color: "#f8f3db", // color code in string
            attributes: []
        }
    ]
};

contract("AvatarRegistry", ([, user]) => {
    it("should add avatar", async () => {
        const registry = await AvatarRegistry.new(PRICE);
        await registry.addAvatar(AVATAR_1, { from: user, value: PRICE });
        expect(await registry.getNumberOfAvatarsOf(user)).to.be.bignumber.equal(new BN(1));
        await registry.addAvatar(AVATAR_2, { from: user, value: PRICE });
        expect(await registry.getNumberOfAvatarsOf(user)).to.be.bignumber.equal(new BN(2));
    });

    it("should select avatar", async () => {
        const registry = await AvatarRegistry.new(PRICE);
        await registry.addAvatar(AVATAR_1, { from: user, value: PRICE });
        expect(await registry.getSelectionOf(user)).to.be.bignumber.equal(new BN(0));
        await registry.addAvatar(AVATAR_2, { from: user, value: PRICE });
        expect(await registry.getSelectionOf(user)).to.be.bignumber.equal(new BN(1));
        await registry.selectAvatar(0, { from: user });
        expect(await registry.getSelectionOf(user)).to.be.bignumber.equal(new BN(0));
    });
});
