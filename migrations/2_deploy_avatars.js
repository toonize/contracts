const Avatars = artifacts.require("Avatars.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Avatars);
};
