import React from 'react';
import colors from '../colors';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const GenerationPrompt = ({ onGenerateNFTClick, onSubmitClick, setAltText, imgPath }) => {
    const fetch = require('node-fetch');
    const fs = require('fs');

    const Buffer = require('buffer').Buffer;

    const { Configuration, OpenAIApi } = require("openai");
        
    const configuration = new Configuration({
        organization: "",
        apiKey: ""
    });

    const openai = new OpenAIApi(configuration);

    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [imageURL, setImageURL] = React.useState('https://lh4.googleusercontent.com/DpLHDSX6xnLwFYR61IqSudYU7Gu-yHfySpx5PqX7Tt5p-iCGnheKOmpudJ2i5YnE2ScBhivk8MSBo3V9NWD2pb4cxSCHk5rnKaxXn-HweJlarS8YqRA3izoMeo4vOyFBVrzIQrf5eUe6Hpb-LUAuldc');
    const [isDownloaded, setIsDownloaded] = React.useState(false);
    const [fileName, setFileName] = React.useState('');

    React.useEffect(() => {
        onGenerateNFTClick(imageURL);
        setAltText(description);
        imgPath(fileName);
    }, [isDownloaded===true]);

    const downloadImage = () => {
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
            });
    }

    const generateNFT = async () => {
        console.log('Generating NFT...');

        // const response = await openai.createImage({
        //     prompt: description,
        //     n: 1,
        //     size: "256x256",
        // });

        // setImageURL(response.data.data[0].url);
        setImageURL('https://lh4.googleusercontent.com/DpLHDSX6xnLwFYR61IqSudYU7Gu-yHfySpx5PqX7Tt5p-iCGnheKOmpudJ2i5YnE2ScBhivk8MSBo3V9NWD2pb4cxSCHk5rnKaxXn-HweJlarS8YqRA3izoMeo4vOyFBVrzIQrf5eUe6Hpb-LUAuldc');
        
        console.log('Image URL: ', imageURL);
        
        downloadImage();

        setLoading(false);
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
                    <ColorButton 
                        disabled={loading || description.length === 0}
                        variant="contained" 
                        type="submit"
                        onClick={() => generateNFT()}
                        >
                            Generate
                    </ColorButton>
                </form>
            </div>
        </div>
    );
};

export default GenerationPrompt
