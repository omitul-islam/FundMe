import { config as dotenvConfig } from "dotenv"
// import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan"
import "solidity-coverage"
import "hardhat-deploy"

dotenvConfig()

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://sepolia.infura.io/v3/d50ea5ea399e40e0a33dbea45a28aa23"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "912a768d032df04a5ca497f8eee9c250bda143a61169aa39d4f53fd906d795e3"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

export default {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
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
}
