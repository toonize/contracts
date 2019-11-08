const Avatars = artifacts.require("Avatars");
const ToonizeToken = artifacts.require("ToonizeToken");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

require("dotenv").config();

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh
const ZERO = "0x0000000000000000000000000000000000000000";
const AVATAR_1 = "0xf3a424378d72ff1e53be2b4b524a26fa2c843dbe";
const AVATAR_2 = "0xc0607a1f15d692923cc7bda034c6073a8a7dff5b";

contract("ToonizeToken", ([, user]) => {
    it("should add and select avatar", async () => {
        const lib = await Avatars.new();
        await ToonizeToken.link("Avatars", lib.address);
        const token = await ToonizeToken.new("0x0000000000000000000000000000000000000000", PRICE);

        expectRevert(token.addAvatar(AVATAR_1, { from: user }), "ToonizeToken: price too low");
        expectRevert(token.addAvatar(ZERO, { from: user, value: PRICE }), "ToonizeToken: hash must not be 0");

        await token.addAvatar(AVATAR_1, { from: user, value: PRICE });
        let avatars = await token.getAvatarsOf(user);
        expect(avatars.length).to.be.equal(1);

        expect(await web3.eth.getBalance(token.address)).to.be.bignumber.equal(PRICE);
        await token.withdraw(user);
        expect(await web3.eth.getBalance(token.address)).to.be.bignumber.equal(new BN(0));

        await token.addAvatar(AVATAR_2, { from: user, value: PRICE });
        avatars = await token.getAvatarsOf(user);
        expect(avatars.length).to.be.equal(2);

        expectRevert(token.selectAvatar(ZERO), "ToonizeToken: hash must not be 0");
        expect(await token.getSelectedAvatarOf(user)).to.be.equal(AVATAR_2);
        await token.selectAvatar(AVATAR_1, { from: user });
        expect(await token.getSelectedAvatarOf(user)).to.be.equal(AVATAR_1);
    });
});
