// v2.0.0
// This is a component that will be used to mint NFTs with traits
// In the future, this will be used to mint NFTs with traits

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const IconButtonStyled = styled(IconButton)(() => ({
    display: 'block',
    '&:hover': {
        backgroundColor: 'white',
    },
}));

const Minter = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const MintNFT = async () => {
        console.log('Minting NFT');
    };

    const addTraitInput = () => {
        console.log('Adding Trait Input')

        traitArray.push(defaultTraitFields);
        setTraitArray([...traitArray, defaultTraitFields]);
    };

    const defaultTraitFields = () => {
        return (
            <>
                <TextField id="traitType1" label="Trait Type" variant="outlined" />
                <TextField id="value1" label="Value" variant="outlined" />
            </>
        );
    };

    const [traitArray, setTraitArray] = React.useState([defaultTraitFields]);

    const TraitModal = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        NFT Traits (Optional)
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '20px',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}
                    >
                        <TextField id="traitType" label="Trait Type" variant="outlined" />
                        <TextField id="value1" label="Value" variant="outlined" />
                        <IconButtonStyled aria-label="playlistAddIcon" onClick={addTraitInput}>
                            <AddIcon />
                        </IconButtonStyled>
                    </div>  

                    {traitArray.map((trait, index) => {
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '20px',
                                justifyContent: 'space-between',
                                marginTop: '20px',
                            }}
                        >
                            <TextField id="traitType" label="Trait Type" variant="outlined" />
                            <TextField id="value1" label="Value" variant="outlined" />
                            <IconButtonStyled aria-label="playlistAddIcon" onClick={addTraitInput}>
                                <AddIcon />
                            </IconButtonStyled>
                        </div>
                    })}
                    <MintButton role={MintNFT} />
                </Box>
            </Modal>
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
            <MintButton role={handleOpen}/>
            <TraitModal />
        </>
    );
};

export default Minter;