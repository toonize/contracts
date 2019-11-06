require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const LoomTruffleProvider = require("loom-truffle-provider");

module.exports = {
    networks: {
        mainnet: {
            provider: () =>
                new HDWalletProvider(
                    process.env.ETHEREUM_ADMIN_PRIVATE_KEY,
                    "https://mainnet.infura.io/v3/" + process.env.ETHEREUM_PROJECT_ID
                ),
            network_id: 1,
            gasPrice: 2 * 10 ** 10 // 20 gwei
        },
        rinkeby: {
            provider: () =>
                new HDWalletProvider(
                    process.env.ETHEREUM_ADMIN_PRIVATE_KEY,
                    "https://rinkeby.infura.io/v3/" + process.env.ETHEREUM_PROJECT_ID
                ),
            network_id: 4,
            gasPrice: 2 * 10 ** 10 // 20 gwei
        },
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
                evmVersion: "byzantium"
            }
        }
    }
};
