const { ethers, getNamedAccounts, deployments } = require("hardhat");

async function main() {
  const chainId=network.config.chainId;
  if(chainId==31337){
      await deployments.fixture(["all"]);
  }
  const { deployer } = await getNamedAccounts();

  const fundMeDeployment = await deployments.get("FundMe");

  const signer = await ethers.getSigner(deployer);
  const fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address, signer);

  console.log("Contract address:", fundMeDeployment.address);
  console.log("Deployer address:", deployer);

  console.log("Withdrawing from contract...");
  const txResponse = await fundMe.withdraw();
  await txResponse.wait(1);
  console.log("Withdrawal complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
