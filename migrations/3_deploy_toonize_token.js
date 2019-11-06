const { EthereumNetwork } = require("@lev-x/loom-x/dist/networks");
const { EthereumChain } = require("@lev-x/loom-x/dist/chains");
const {BN} = require("@openzeppelin/test-helpers");

const Avatars = artifacts.require("Avatars.sol");
const ToonizeToken = artifacts.require("ToonizeToken.sol");

require("dotenv").config();

const PRICE = new BN(10).pow(new BN(16)); // 0.01 ETh

module.exports = async function(deployer, network) {
  if (network === "rinkeby" || network === "mainnet") {
    EthereumNetwork.setCurrent(network === "mainnet" ? EthereumNetwork.mainnet : EthereumNetwork.rinkeby);
    const chain = new EthereumChain(process.env.ETHEREUM_ADMIN_PRIVATE_KEY);
    await deployer.link(Avatars, ToonizeToken);
    await deployer.deploy(ToonizeToken, chain.getTransferGateway().address, PRICE);
  }
};
