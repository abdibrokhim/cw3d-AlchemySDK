const metadata = 
{
    "attributes": [
      {
        "trait_type": "Type",
        "value": "AI"
      },
      {
        "trait_type": "Body",
        "value": "Blue"
      },
      {
        "trait_type": "Eyes",
        "value": "Open"
      },
      {
        "trait_type": "Background",
        "value": "Cyber City"
      }
    ],
    "description": "Cyber Girl",
    "image": "ipfs://QmebkXxLF85AbfuaMuNe5XE5e4bWRPGmTxaCXXEbe2bd63",
    "name": "Cyber Girl"
}

const pinataSDK = require('@pinata/sdk');
const pinataJWTKey = "";

const pinata = new pinataSDK({ pinataJWTKey: pinataJWTKey });

const pinataPinJSONToIPFS = async (name, JSONBody) => {
    try {
        const options = {
            pinataMetadata: {
                name: name,
            },
            pinataOptions: {
                cidVersion: 0,
            },
        };
        const result = await pinata.pinJSONToIPFS(JSONBody, options);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const pinataPinFileToIPFS = async (name, file) => {
    const fs = require('fs');
    const readableStreamForFile = fs.createReadStream(file);

    try {
        const options = {
            pinataMetadata: {
                name: name,
            },
            pinataOptions: {
                cidVersion: 0,
            },
        };
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        return result;
    } catch (error) {
        console.log(error);
    }
};

pinataPinFileToIPFS("Girl", "./cyber.png")
    .then((result) => {
        console.log(result);
    }
);

// pinataPinJSONToIPFS("Cyber Girl", metadata)
//     .then((result) => {
//         console.log(result);
//     }
// );
