// require('@nomicfoundation/hardhat-toolbox');
// require('dotenv').config()

// module.exports = {
// 	solidity: "0.8.9",
// 	networks: {
// 		hardhat: {},
// 		ETH_MAINNET: {
// 			accounts: [`${process.env.PRIVATE_KEY}`],
// 			url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
// 		},
// 		ETH_GOERLI: {
// 			accounts: [`${process.env.PRIVATE_KEY}`],
// 			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
// 		}
// 	},
// 	etherscan: {
// 		apiKey: `${process.env.ETHERSCAN_API_KEY}`
// 	}
// }

/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ALCHEMY_API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: ALCHEMY_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
