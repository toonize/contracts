const ToonizeToken = artifacts.require("ToonizeToken.sol");
const {BN} = require("@openzeppelin/test-helpers");

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh

require("dotenv").config();

module.exports = async function(deployer, network) {
  if (network.startsWith("rinkeby") || network.startsWith("mainnet")) {
    const gateway = network.startsWith("mainnet") ? process.env.ETHEREUM_MAINNET_GATEWAY : process.env.ETHEREUM_RINKEBY_GATEWAY;
    await deployer.deploy(ToonizeToken, gateway, PRICE);
  }
};
