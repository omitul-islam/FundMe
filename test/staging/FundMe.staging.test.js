const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require('../../helper-hardhat-config');
const { assert } = require("chai");

developmentChains.includes(network.name) 
    ? describe.skip 
    : describe("FundMe", function () {
        let fundMe;
        let deployer;
        const sendValue = ethers.parseEther("0.05");

        beforeEach(async function () {
            ({ deployer } = await getNamedAccounts());
            fundMe = await ethers.getContractAt("FundMe", deployer);
        });

        it("allows people to fund and withdraw", async function() {
            const startingBalance = await ethers.provider.getBalance(fundMe.target);
            console.log("StartingBalance", startingBalance);

            await fundMe.fund({value:sendValue});
            await fundMe.withdraw();

            const endingBalance = await ethers.provider.getBalance(fundMe.target);
            console.log("Ending Balance", endingBalance.toString());

            assert.equal(endingBalance.toString(), "0");

        })
    });