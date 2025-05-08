const dotenvConfig = require("dotenv").config;
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-ethers");
require("solidity-coverage");
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-deploy");

dotenvConfig();

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://sepolia.infura.io/v3/d50ea5ea399e40e0a33dbea45a28aa23";
const PRIVATE_KEY =
    process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            // gasPrice: 5000000, 
            // gas: 5000000,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.19",
            },
            {
                version: "0.8.7",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
    mocha: {
        timeout: 500000,
    },
};
