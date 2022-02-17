const hre = require("hardhat");

async function run (){
  const Hello = await hre.ethers.getContractFactory('Hello');
  const hello = await Hello.deploy(1000);

  await hello.deployed();

  console.log("Hello deployed to:", hello.address);
  
  const helloTotal = await hello.getHelloTotal();

  console.log('helloTotal', helloTotal);
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });