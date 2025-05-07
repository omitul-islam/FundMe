const { ethers, getNamedAccounts, deployments } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
   
  const signers = await ethers.getSigners();
  const sender = signers[0];

  console.log("Sender",sender.address);
  // Get the deployment details of FundMe contract
  console.log("deployer",deployer);
  const fundMeDeployment = await deployments.get("FundMe");

  // Fetch the FundMe contract at the deployed address
  console.log(fundMeDeployment.address);
  const fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address);
  
  console.log(`Got contract FundMe at ${fundMe.target}`);
  console.log("Funding contract...");

  const transactionResponse = await fundMe.fund({
    value: ethers.parseEther("0.1"), 
  });


  await transactionResponse.wait();
  
  console.log("Funded!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });