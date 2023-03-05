import React from 'react';
import GenerationPrompt from '../components/GenerationPrompt';
import GeneratedImage from '../components/GeneratedImage';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Minter from '../components/Minter';

const HomePage = () => {

    const [imageURL, setImageURL] = React.useState('');
    const [status, setStatus] = React.useState(false);
    const [altText, setAltText] = React.useState("");
    const [privateKey, setPrivateKey] = React.useState("");
    const [fileName, setFileName] = React.useState("");

    return (
        <>
            <Container>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid md={6} xs={12}>
                        <GenerationPrompt 
                            onGenerateNFTClick={(image_URL) => setImageURL(image_URL)} 
                            onSubmitClick={(bool) => setStatus(bool)}
                            setAltText={(alt_text) => setAltText(alt_text)}
                            imgPath={(file_name) => setFileName(file_name)}
                        />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <GeneratedImage
                            imageURL={imageURL}
                            altText={altText}
                            isSubmitted={status}
                        />
                    </Grid>
                </Grid>
                <Minter 
                    name={altText}
                    key={privateKey}
                    path={fileName}
                />
            </Container>
        </>
    );
  };
  
  export default HomePage;