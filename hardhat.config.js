require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { PRIVATE_KEY } = process.env;
const { INFURA_PROJECT_ID } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    kovan: {
        url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
        accounts: [`0x` + PRIVATE_KEY],
        gas: 2100000,
      },
    rinkeby: {
        url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
        accounts: [`0x` + PRIVATE_KEY],
        gas: 2100000,
        gasPrice: 8000000000
      },
  }
};
