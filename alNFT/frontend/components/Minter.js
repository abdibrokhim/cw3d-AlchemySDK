import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const Minter = ({ name, key, path }) => {

    const [nftTxn, setNftTxn] = React.useState('');
    const [ipfsHash, setIpfsHash] = React.useState('');
    
    const [imageName, setImageName] = React.useState('');
    const [imgPath, setImgPath] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');

    React.useEffect(() => {
        setImageName(name);
        setImgPath(key);
        setPrivateKey(path);
    }, [path]);

    const MintNFT = async () => {
        console.log('Pin NFT File to IPFS...');

        setTimeout(() => {
            pinFileToIPFS();
        }, 2000);

        console.log('Pin NFT JSON to IPFS...');
        setTimeout(() => {
            pinJSONToIPFS();
        }, 2000);

        console.log('Minting NFT');

        fetch(`http://localhost:3005/api/mint-nft?privateKey=${privateKey}&ipfsHash=${ipfsHash}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const txHash = data.message;
                    console.log(txHash);
                    
                    setIpfsHash(txHash);
                } else {
                    const error = data.error;
                    console.error(error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const pinFileToIPFS = async () => {
        console.log('Pinning file to IPFS...');

        fetch(`http://localhost:3005/api/pinFileToIPFS?description=${imageName}&fileName=${imgPath}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const ipfsHash = data.message.IpfsHash;
                    console.log(ipfsHash);

                    setIpfsHash(ipfsHash);
                } else {
                    const error = data.error;
                    console.error(error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const pinJSONToIPFS = async () => {
        fetch(`http://localhost:3005/api/pinJSONToIPFS?name=${imageName}&description=${imageName}&ipfsHash=${ipfsHash}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const ipfsHash = data.message.IpfsHash;
                    console.log(ipfsHash);

                    setIpfsHash(ipfsHash);
                } else {
                    const error = data.error;
                    console.error(error);
                }
            }
        );
    };
    

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(teal[600]),
        backgroundColor: teal[600],
        padding: '10px 40px',
        marginTop: '20px',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: teal[900],
        },
        '&:disabled': {
            backgroundColor: teal[400],
            color: theme.palette.getContrastText(teal[400]),
            cursor: 'not-allowed',
        }
    }));

    const MintButton = ({ role }) => {
        return (
            <ColorButton 
                variant="contained" 
                type="submit"
                onClick={role}
                >
                    Mint
            </ColorButton>
        );
    };

    return (
        <>
            <MintButton role={MintNFT}/>
        </>
    );
};

export default Minter;