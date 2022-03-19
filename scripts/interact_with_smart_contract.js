require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = 'artifacts/contracts/Greeter.sol/Greeter.json';
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = '0x9E1B230f5C1f10E8593cA913b92a314a6aB3af28';

// load ABI from build artifacts
async function getAbi(){
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}

async function main() {
    const {INFURA_PROJECT_ID}  = process.env;
    let provider = ethers.getDefaultProvider(`https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`);
    const abi = await getAbi()

    /* 
    // READ-only operations require only a provider.
    // Providers allow only for read operations.
    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
    const greeting = await contract.greet();
    console.log(greeting);
    */

    // WRITE operations require a signer
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const new_contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    let tx = await new_contract.setGreeting('Updated greeting');
    await tx.wait();
    const updated_greeting = await new_contract.greet();
    console.log(updated_greeting);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });