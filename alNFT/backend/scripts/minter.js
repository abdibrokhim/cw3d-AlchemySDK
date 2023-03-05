require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy App URL
const ALCHEMY_API_KEY = "";

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);

// Get contract ABI file
const contract = require("../artifacts/contracts/Lychee.sol/Lychee.json");

// Create a signer
const privateKey = ""; // private key of the account that will mint the NFT
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = "";

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

const hash = "";
// Get the NFT Metadata IPFS URL
// const ipfsNFT = "ipfs://QmbDi2tNFWnwHwLgjskDSAHUtYQfEwFcipqxZKrM9zP7eL" 
const tokenUri = `https://gateway.pinata.cloud/ipfs/${hash}`;
// const tokenUri = "https://gateway.pinata.cloud/ipfs/QmbVGXexs1yTzjVuNZURCjY8drgeu819Jnnm8m8buN5HCn"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
    await nftTxn.wait();
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });