const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");


!developmentChains.includes(network.name) ? describe.skip
: describe("FundMe", function () {
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    const sendValue = ethers.parseEther("1");
    
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(['all']);
        
        const fundMeAddress = (await deployments.get("FundMe")).address;
        const mockAddress = (await deployments.get("MockV3Aggregator")).address;
        console.log("mockadd",mockAddress);
        
        fundMe = await ethers.getContractAt("FundMe", fundMeAddress);
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", mockAddress);
        // console.log("asfasf",mockV3Aggregator);
    });

    describe("constructor", function () {
        it("sets the aggregator addresses correctly!", async function() {
          const response = await fundMe.s_priceFeed();
          // console.log("asfasfasf",mockV3Aggregator.target);
            assert.equal(response, mockV3Aggregator.target);
        });
    });

    describe("fund", async function(){
        it("Fails if you don't send enough ETH", async function() {
          await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!");
        })
        it("Updated the amount funded data structure", async function() {
          await fundMe.fund({value: sendValue});
          const response  = await fundMe.getAddressToAmountFunded(deployer);
          assert.equal(response.toString(), sendValue.toString());

        })
        it("Adds funder", async function() {
          await fundMe.fund({value:sendValue});
          const funder = await fundMe.getFunder(0);
          assert.equal(deployer, funder);
        })
    })

    describe("withdraw", async function() {
       beforeEach(async function() {
         await fundMe.fund({value:sendValue});
       })

       it("Withdraw ETH from a single founder", async function() {
          const startingFundMeBalance = await ethers.provider.getBalance(fundMe.target);
          const startingDeployerBalance = await ethers.provider.getBalance(deployer);

          const transactionResponse = await fundMe.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const gasUsed = transactionReceipt.gasUsed;
          const effectiveGasPrice = transactionReceipt.gasPrice;
          
          const gasCost = gasUsed * effectiveGasPrice;
          
          const endingFundMeBalance = await ethers.provider.getBalance(fundMe.target);
          const endingDeployerBalance = await ethers.provider.getBalance(deployer);
          
          assert.equal(endingFundMeBalance.toString(), "0");
          assert.equal(
            (startingDeployerBalance + startingFundMeBalance).toString(),
            (endingDeployerBalance + gasCost).toString()
          );
          
       })
       
    })
});