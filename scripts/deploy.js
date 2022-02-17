const hre = require('hardhat');

async function deploy(){
  const HelloContractFactory = await hre.ethers.getContractFactory('Hello');
  const helloContract = await HelloContractFactory.deploy(1000);

  await helloContract.deployed();

  console.log('deploy address', helloContract.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });