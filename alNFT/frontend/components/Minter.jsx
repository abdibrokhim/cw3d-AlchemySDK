import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import Link from '@mui/material/Link';
import colors from '../colors';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const Minter = ({ name, path }) => {

    const [loading, setLoading] = React.useState(false);
    const [minting, setMinting] = React.useState(false);
    const [mintIsDone, setMintIsDone] = React.useState(false);
    const [showMintButton, setShowMintButton] = React.useState(false);
    const [nftTxn, setNftTxn] = React.useState('');
    const [ipfsHash, setIpfsHash] = React.useState('');
    
    const [imageName, setImageName] = React.useState('');
    const [imgPath, setImgPath] = React.useState('');
    
    const [alertText, setAlertText] = React.useState([]);

    const [APIAlertText, setAPIAlertText] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');

    const modalTextSuccess = "Are you sure you want to mint this NFT?";
    const modalTextFail = "Let's Generate NFT first!";
    
    const handleOpenModalSuccess = () => { 
        setOpenModal(true);
        setModalTitle(modalTextSuccess);
        setShowMintButton(true);
    }

    const handleOpenModalFail = () => {
        setOpenModal(true);
        setModalTitle(modalTextFail);
        setShowMintButton(false);
    }

    const handleCloseModal = () => setOpenModal(false);

    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
        setMinting(false);
    };

    React.useEffect(() => {
        setImageName(name);
        setImgPath(path);
    }, [path]);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const Alertbar = () => {
        return (
            <Stack spacing={2} sx={{ zIndex: '9999', width: '100%' }}>
                <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertText.status} sx={{ width: '100%', color: 'white'}}>
                        {alertText.message}
                    </Alert>
                </Snackbar>
            </Stack>
        );
    };

    const MintNFT = async () => {
        setLoading(true);
        setMinting(true);

        console.log('Pin NFT File to IPFS...');
        pinFileToIPFS();

        console.log('Pin NFT JSON to IPFS...');
        pinJSONToIPFS();

        console.log('Minting NFT');
        
        setOpenAlert(true);
        setAlertText({status: 'info', message: "Minting NFT..."});

        try {
            if (ipfsHash.length > 0) {
                fetch(`http://localhost:3005/api/mint-nft?ipfsHash=${ipfsHash}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const jsonData = JSON.parse(data);
                            const txHash = jsonData.message;
                            console.log('txHash:', txHash);
                            
                            setNftTxn(txHash);

                        } else {
                            const error = data.error;
                            console.error(error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                console.error('Error: IPFS hash or private key is missing');
                setOpenAlert(true);
                setAlertText({status: 'error', message: 'Error: IPFS hash or private key is missing'});
                return; 
            }
        } catch (error) {
            console.log(error);
            setAPIAlertText('Something went wrong, while minting NFT.');
            return; 
        }

        setLoading(false);
        setMinting(false);
        setMintIsDone(true);
    };

    const pinFileToIPFS = async () => {
        console.log('Pinning file to IPFS...');

        try {
            if (imgPath.length > 0 && imageName.length > 0) {
                fetch(`http://localhost:3005/api/pinFileToIPFS?description=${imageName}&fileName=${imgPath}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const jsonData = JSON.parse(data);
                            const ipfsHash = jsonData.message.IpfsHash;
                            console.log('ipfsHash:', ipfsHash);

                            setIpfsHash(ipfsHash);
                        } else {
                            const error = data.error;
                            console.error(error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                console.error('Error: Image path or image name is missing');
                setOpenAlert(true);
                setAlertText({status: 'error', message: 'Error: Image path or image name is missing'});
                return; 
            }
        } catch (error) {
            console.log(error);
            setAPIAlertText('Something went wrong, while pinning file to IPFS.');
            return; 
        }
        // setAPIAlertText('');
    };

    const pinJSONToIPFS = async () => {
        try {
            if (ipfsHash.length > 0 && imageName.length > 0) {
                fetch(`http://localhost:3005/api/pinJSONToIPFS?name=${imageName}&description=${imageName}&ipfsHash=${ipfsHash}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const jsonData = JSON.parse(data);
                            const ipfsHash = jsonData.message.IpfsHash;
                            console.log('ipfsHash:', ipfsHash);

                            setIpfsHash(ipfsHash);
                        } else {
                            const error = data.error;
                            console.error(error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                console.error('Error: IPFS hash or image name is missing');
                setOpenAlert(true);
                setAlertText({status: 'error', message: 'Error: IPFS hash or image name is missing'});
                return; 
            }
        } catch (error) {
            console.log(error);
            setAPIAlertText('Something went wrong, while pinning metadata to IPFS.');
            return; 
        }
    };
    

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blueGrey[600]),
        backgroundColor: blueGrey[600],
        padding: '10px 40px',
        marginTop: '20px',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: blueGrey[900],
        },
        '&:disabled': {
            backgroundColor: blueGrey[400],
            color: theme.palette.getContrastText(blueGrey[400]),
            cursor: 'not-allowed',
        }
    }));

    const MintButton = ({ role }) => {
        return (
            <ColorButton 
                disabled={minting}
                variant="contained" 
                type="submit"
                onClick={role}
                >
                    Mint
            </ColorButton>
        );
    };

    const CheckNFTTxn = () => {
        return (
          <div
            className=''
            style={{
                fontSize: '16px',
                width: '100%',
                padding: '10px 10px 10px 20px',
                marginTop: '20px',
                borderRadius: '5px',
                backgroundColor: colors.button_bg_primary,
                color: colors.const_dark_text,
            }}
          >
            <Link href={nftTxn} underline="hover">
                {nftTxn}
            </Link>
        </div>
        );
    };

    const MintModal = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            justifyContent: 'space-between',
                        }}
                    >
                        {showMintButton ?
                            <WarningAmberRoundedIcon style={{ color: '#f44336', fontSize: '40px' }} /> :
                            <TipsAndUpdatesIcon style={{ color: '#009688', fontSize: '40px' }} />
                        }
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography>
                        {showMintButton ? 
                            <MintButton role={MintNFT} /> : <></>
                        }
                        {minting ?
                            <CircularProgress /> : <></>
                        }
                        {mintIsDone ? 
                            <CheckNFTTxn /> : <></>
                        }
                    </div>
                </Box>
            </Modal>
        );
    };

    return (
        <>
            <MintButton role={!(imgPath && imageName) ? handleOpenModalSuccess : handleOpenModalFail }/>
            <MintModal />
            {openAlert ? <Alertbar /> : <></>}
            {APIAlertText.length > 0 ? <APIAlerts /> : <></>}
        </>
    );
};

export default Minter;