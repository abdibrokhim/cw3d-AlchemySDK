// require('dotenv').config();
import React from 'react';
import colors from '../colors';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Minter from './Minter';

const GenerationPrompt = ({ onGenerateNFTClick, onSubmitClick, setAltText }) => {
    const fetch = require('node-fetch');

    const { Configuration, OpenAIApi } = require("openai");
        
    const configuration = new Configuration({
        organization: process.env.OPENAI_ORG,
        apiKey: process.env.OPENAI_API_KEY,
    });
    let apiKey = process.env.OPENAI_API_KEY;
    console.log('apiKey', apiKey);

    const openai = new OpenAIApi(configuration);

    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [imageURL, setImageURL] = React.useState('');
    const [isDownloaded, setIsDownloaded] = React.useState(false);
    const [fileName, setFileName] = React.useState('');
    const [alertText, setAlertText] = React.useState([]);
    
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    React.useEffect(() => {
        if (isDownloaded === false) {
            onGenerateNFTClick(imageURL);
            setAltText(description);
        }
    }, []);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const Stackbar = () => {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertText.status} sx={{ width: '100%', color: 'white'}}>
                    {alertText.message}
                </Alert>
            </Snackbar>
            </Stack>
        );
    };

    const downloadImage = async ({ imageURL }) => {
        try {
            if (imageURL.length > 0) {
                fetch(`http://localhost:3005/api/download-image?url=${imageURL}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const file_path = data.message;
                            console.log(file_path);
                            
                            setFileName(file_path);

                            setIsDownloaded(true);
                        } else {
                            const error = data.error;
                            console.error(error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        setOpen(true);
                        setAlertText({status: 'error', message: 'Error: Failed to catch image'});
                    });
            } else {
                console.error('Error: Image URL is empty');
                setOpen(true);
                setAlertText({status: 'error', message: 'Error: Image URL is empty'});
            }
        } catch (error) {
            console.error('Error:', error);
            setOpen(true);
            setAlertText({status: 'error', message: 'Error: Failed to download image'});
        }
    };

    const generateNFT = () => {
        console.log('Generating NFT...');
        setOpen(true);
        setAlertText({status: 'info', message: 'Info: Generating NFT...'});

        let response = null;

        try {
            response = openai.createImage({
                prompt: description,
                n: 1,
                size: "256x256",
            });
            console.log(response);
            
            if (response) {
                const image_url = resData.data.data[0].url;
    
                if (image_url === '') {
                    setOpen(true);
                    setAlertText({status: 'error', message: 'Error: Failed to generate image'});
                    return;
                } else {
                    setImageURL(image_url);
                    setOpen(true);
                    setAlertText({status: 'success', message: 'Success: Image generated'});
                    downloadImage(image_url);
                }
                
                console.log('Image URL: ', imageURL);
                
            } else {
                setOpen(true);
                setAlertText({status: 'error', message: 'Error: Failed to get response'});
                return;
            }
        } catch (error) {
            console.error('Error:', error);
            setOpen(true);
            setAlertText({status: 'error', message: 'Error: Failed to generate image'});
        }
        setLoading(false);

        onSubmitClick(false);
    };

    function handleSubmit(e) {
        e.preventDefault();

        onSubmitClick(true);
        
        setDescription(description);
    }

    const disabledStyle = {
        cursor: 'not-allowed',
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

    return (
        <div 
            className=''>
            {open ? Stackbar() : <></>}
            <div 
                className=''
                style={{
                    backgroundColor: colors.content_bg_dark,
                    padding: '20px',
                    borderRadius: '5px',
                }}>
                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        style={{
                            color: colors.const_light_text,
                            fontSize: '20px',
                            fontWeight: 'bold',

                        }}   
                    >
                        Description
                    </div>
                    <div
                        style={{
                            color: colors.const_light_text,
                            fontSize: '14px',

                        }}   
                    >
                        Description of your NFT
                    </div>
                    <textarea
                        className=''
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '10px',
                            marginTop: '15px',
                            border: 'none',
                            fontSize: '16px',
                            borderRadius: '5px',
                            resize: 'none',
                            backgroundColor: colors.button_bg_primary,
                            color: colors.const_dark_text,
                            outline: 'none',
                        }}
                        placeholder='Enter your text here'
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '20px',
                        }}
                    >
                        <ColorButton 
                            disabled={loading || description.length === 0}
                            variant="contained" 
                            type="submit"
                            onClick={() => generateNFT()}
                            >
                                Generate
                        </ColorButton>
                        <Minter name={description} path={fileName}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerationPrompt;
