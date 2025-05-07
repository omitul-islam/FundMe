const { ethers, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let priceFeedAddress;

    if (chainId === 31337) {
        const mockV3Aggregator = await deploy("MockV3Aggregator", {
            from: deployer,
            args: [8, 200000000000],
            log: true,
        });
        priceFeedAddress = mockV3Aggregator.address;
    } else {
        priceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
    }

    await deploy("FundMe", {
        from: deployer,
        args: [priceFeedAddress],
        log: true,
    });
};

module.exports.tags = ["all", "fundme"]
