const hardhat = require("hardhat");
const { run, ethers, network } = hardhat;

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000"

const deployMocks = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        const mockV3Aggregator  = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks Deployed!")
        log("MockV3Aggregator deployed at:", mockV3Aggregator.address); 
        log("------------------------------------------------")
        log("You are deploying to a local network, you'll need a local network running to interact")
        log("Please run `npx hardhat console` to interact with the deployed smart contracts!")
        log("------------------------------------------------")
    }
}

module.exports = deployMocks
deployMocks.tags = ["all", "mocks"]
