const {BN} = require("@openzeppelin/test-helpers");
const AvatarRegistry = artifacts.require("AvatarRegistry.sol");
const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh

module.exports = async function(deployer) {
  await deployer.deploy(AvatarRegistry, PRICE);
};
