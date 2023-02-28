import React from 'react';
import colors from '../colors';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const GenerationPrompt = ({ onGenerateNFTClick, onSubmitClick, setAltText }) => {

    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const generateNFT = async () => {
        console.log('Generating NFT');
      
        axios.defaults.headers.get['Content-Type'] ='application/json; charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(`/api/dallee/${description}`)
            .then(response => {
                console.log(response.data);

                console.log('Image URL: ', response.data)

                onGenerateNFTClick(response.data);
                setAltText(description);
            })
            .catch(err => {
                console.log(err);
            });
        
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
                    {/* <button 
                        disabled={loading || description.length === 0}
                        type="submit"
                        className='generate bg-[#BA0B32] hover:bg-[#ba0b31d2]'
                        style={{
                            color: colors.button_bg_primary,
                            padding: '10px 20px',
                            fontSize: '18px',
                            marginTop: '10px',
                            width: '50%',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => generateNFT()}
                        >
                            Generate
                    </button> */}
                </form>
            </div>
        </div>
    );
};

export default GenerationPrompt
