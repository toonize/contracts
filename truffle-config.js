require("dotenv").config();
const LoomTruffleProvider = require("loom-truffle-provider");

module.exports = {
    networks: {
        extdev: {
            provider: () => {
                const provider = new LoomTruffleProvider(
                    "extdev-plasma-us1",
                    "https://extdev-plasma-us1.dappchains.com/rpc",
                    "https://extdev-plasma-us1.dappchains.com/query",
                    process.env.ADMIN_PRIVATE_KEY
                );
                const engine = provider.getProviderEngine();
                engine.addCustomMethod("web3_clientVersion", () => "");
                return provider;
            },
            gasPrice: 0,
            network_id: "*"
        },
        plasma: {
            provider: () => {
                const provider = new LoomTruffleProvider(
                    "default",
                    "https://plasma.dappchains.com/rpc",
                    "https://plasma.dappchains.com/query",
                    process.env.ADMIN_PRIVATE_KEY
                );
                const engine = provider.getProviderEngine();
                engine.addCustomMethod("web3_clientVersion", () => "");
                return provider;
            },
            gasPrice: 0,
            network_id: "*"
        }
    },

    // Set default mocha options here, use special reporters etc.
    // mocha: {
        // timeout: 100000
    // },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.11",    // Fetch exact version from solc-bin (default: truffle's version)
            settings: {          // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                evmVersion: "constantinople"
            }
        }
    }
};
