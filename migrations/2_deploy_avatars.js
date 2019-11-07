const Avatars = artifacts.require("Avatars.sol");

module.exports = async function(deployer, network) {
  if (network.startsWith("rinkeby") || network.startsWith("mainnet")) {
    await deployer.deploy(Avatars);
  }
};
