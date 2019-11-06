const Avatars = artifacts.require("Avatars.sol");

module.exports = async function(deployer, network) {
  if (network === "rinkeby" || network === "mainnet") {
    await deployer.deploy(Avatars);
  }
};
