const { LoomNetwork } = require("@lev-x/loom-x/dist/networks");
const { LoomChain } = require("@lev-x/loom-x/dist/chains");

const LoomToonizeToken = artifacts.require("LoomToonizeToken.sol");

require("dotenv").config();

module.exports = async function(deployer, network) {
  if (network === "extdev" || network === "plasma") {
    LoomNetwork.setCurrent(network === "plasma" ? LoomNetwork.plasma : LoomNetwork.extdev);
    const chain = new LoomChain(process.env.ADMIN_PRIVATE_KEY);
    const gateway = await chain.getTransferGatewayAsync();
    await deployer.deploy(LoomToonizeToken, gateway.address.local.toString());
  }
};
