const AvatarRegistry = artifacts.require("AvatarRegistry");
const { BN } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh
const AVATAR_1 = "0xf3a424378d72ff1e53be2b4b524a26fa2c843dbe";
const AVATAR_2 = "0xc0607a1f15d692923cc7bda034c6073a8a7dff5b";

contract("AvatarRegistry", ([, user]) => {
  it("should add avatar", async () => {
    const registry = await AvatarRegistry.new(PRICE);
    await registry.addAvatar(AVATAR_1, { from: user, value: PRICE });
    expect(await registry.getNumberOfAvatarsOf(user)).to.be.bignumber.equal(new BN(1));
    await registry.addAvatar(AVATAR_2, { from: user, value: PRICE });
    expect(await registry.getNumberOfAvatarsOf(user)).to.be.bignumber.equal(new BN(2));
    expect(await registry.getAvatarsOf(user)).to.eql([AVATAR_1, AVATAR_2]);
  });

  it("should select avatar", async () => {
    const registry = await AvatarRegistry.new(PRICE);
    await registry.addAvatar(AVATAR_1, { from: user, value: PRICE });
    expect(await registry.getSelectedAvatarOf(user)).to.equal(AVATAR_1);
    await registry.addAvatar(AVATAR_2, { from: user, value: PRICE });
    expect(await registry.getSelectedAvatarOf(user)).to.equal(AVATAR_2);
    await registry.selectAvatar(AVATAR_1, { from: user });
    expect(await registry.getSelectedAvatarOf(user)).to.equal(AVATAR_1);
  });

  it("should set attributes", async () => {
    const registry = await AvatarRegistry.new(PRICE);
    await registry.addAvatar(AVATAR_1, { from: user, value: PRICE });
    await registry.setAttribute(AVATAR_1, "name", web3.utils.fromAscii("TEST"), { from: user });
    expect(await registry.getAttribute(AVATAR_1, "name")).to.equal(web3.utils.fromAscii("TEST"));
  });
});
