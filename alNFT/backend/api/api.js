const express = require('express');
const app = express();
const ethers = require('ethers');
const pinataSDK = require('@pinata/sdk');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});  


// Define your API endpoint
app.post('/api/download-image', async (req, res) => {
    const fetch = await import('node-fetch').then((mod) => mod.default);
    const fs = require('fs');

    const imageUrl = req.query.url;
    const imageName = "im.png"

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    try {
        fs.writeFile(imageName, Buffer.from(buffer), () => {
            console.log(`Image downloaded at ${imageName}`);
            
            // Return a success response to the frontend
            res.status(200).json({ success: true, message: imageName });
        }); 
    } catch (error) {
        console.error(error);

        // Return an error response to the frontend
        res.status(500).json({ success: false, error: error });
    }
});


// Define Alchemy API key and provider
const ALCHEMY_API_KEY = ""; // Your Alchemy API key
const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);

// Get contract ABI file
const contract = require("../artifacts/contracts/Lychee.sol/Lychee.json");

// Define the contract address
const contractAddress = ""; // Your contract address

// Create a contract instance
const abi = contract.abi;
const myNftContract = new ethers.Contract(contractAddress, abi);

// Define the API endpoint to call the mintNFT function
app.post('/api/mint-nft', async (req, res) => {
    try {
        const { privateKey, ipfsHash } = req.query;
        const signer = new ethers.Wallet(privateKey, provider);
        const tokenUri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

        // Call the mintNFT function
        let nftTxn = await myNftContract.connect(signer).mintNFT(signer.address, tokenUri);
        await nftTxn.wait();
        console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

        // Return a success response to the frontend
        res.status(200).json({ success: true, message: `https://goerli.etherscan.io/tx/${nftTxn.hash}` });
    } catch (error) {
        console.error(error);
        // Return an error response to the frontend
        res.status(500).json({ success: false, error: error });
    }
});


const pinataJWTKey = "";

const pinata = new pinataSDK({ pinataJWTKey: pinataJWTKey });

// Pin a JSON to IPFS
app.post('/api/pinJSONToIPFS', async (req, res) => {
    const description = req.query.description;
    const name = req.query.name;
    const ipfsHash = req.query.ipfsHash;

    const metadata = {
        "attributes": [
            {
              "trait_type": "test",
              "value": "test"
            },
        ],
        "description": description,
        "image": `ipfs://${ipfsHash}`,
        "name": name
    }

    try {
        const options = {
            pinataMetadata: {
                name: name,
            },
            pinataOptions: {
                cidVersion: 0,
            },
        };
        const result = await pinata.pinJSONToIPFS(metadata, options);
        
        // Return a success response to the frontend
        res.status(200).json({ success: true, message: { IpfsHash: result.IpfsHash, PinSize: result.PinSize, Timestamp: result.Timestamp }});
    } catch (error) {
        console.log(error);
        
        // Return an error response to the frontend
        res.status(500).send(error);
    }
});

// Pin a file to IPFS
app.post('/api/pinFileToIPFS', async (req, res) => {
    const description = req.query.description;
    const fileName = req.query.fileName;
    
    const fs = require('fs');

    const readableStreamForFile = fs.createReadStream(`./${fileName}`);

    try {
        const options = {
            pinataMetadata: {
                name: description,
            },
            pinataOptions: {
                cidVersion: 0,
            },
        };
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        
        // Return a success response to the frontend
        res.status(200).json({ success: true, message: { IpfsHash: result.IpfsHash, PinSize: result.PinSize, Timestamp: result.Timestamp }});
    } catch (error) {
        console.log(error);
        
        // Return an error response to the frontend
        res.status(500).send(error);
    }
});


// Start the server
app.listen(3005, () => {
    console.log('Server started on port 3005');
});
