const Avatars = artifacts.require("Avatars.sol");
const ToonizeToken = artifacts.require("ToonizeToken.sol");
const {BN} = require("@openzeppelin/test-helpers");

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh

require("dotenv").config();

module.exports = async function(deployer) {
  await deployer.link(Avatars, ToonizeToken);
  await deployer.deploy(ToonizeToken, process.env.ETHEREUM_GATEWAY, PRICE);
};
