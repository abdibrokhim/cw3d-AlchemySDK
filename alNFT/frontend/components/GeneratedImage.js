import React from 'react';
import colors from '../colors';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Minter from '../components/Minter';

import aPrettyGirlImg from '../public/aprettygirl.png';


const GeneratedImage = ({ imageURL, altText, isSubmitted }) => {
  
  const [imgURL, setImgURL] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('Submit: ', isSubmitted);
    setLoading(true)
  }, [isSubmitted]);

  React.useEffect(() => {
    console.log('Image URL: ', imageURL);
    setImgURL(imageURL);
  }, [imageURL]);

  const progressLine = () => {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="primary"/>
      </Stack>
    );
  }

  const SkeletonImg = () => {
    return (
        <Skeleton
          sx={{ bgcolor: 'grey.800', borderRadius: '5px', marginTop: '20px' }}
          variant="rectangular"
          width={'100%'}
          height={'400px'}
        />
    );
  };

  const SkeletonPrompt = () => {
    return (
        <Skeleton
          sx={{ bgcolor: 'grey.800',  borderRadius: '5px', marginTop: '20px' }}
          variant="rectangular"
          width={'100%'}
          height={'50px'}
        />
    );
  };

  const generatedImage = () => {
    return (
      <img 
        src={imgURL.length > 0 ? imgURL : aPrettyGirlImg}
        alt={altText ? altText : 'a pretty girl'}
        style={{
            marginTop: '20px',
            width: '100%',
            height: '400px',
            objectFit: 'contain',
        }}
      />
    );
  };

  const generatedImagePrompt = () => {
    return (
      <div
        className=''
        style={{
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%',
            padding: '10px 10px 10px 20px',
            marginTop: '20px',
            borderRadius: '5px',
            backgroundColor: colors.button_bg_primary,
            color: colors.const_dark_text,
        }}
      >
        {altText ? altText : 'a pretty girl'}
      </div>
    );
  };

  const defaultImage = () => {
    return (
      <img 
        src={aPrettyGirlImg}
        alt="a pretty girl"
        style={{
            marginTop: '20px',
            width: '100%',
            height: '400px',
            objectFit: 'contain',
        }}
      />
    );
  };

  const defaultImagePrompt = () => {
    return (
      <div
        className=''
        style={{
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%',
            padding: '10px 10px 10px 20px',
            marginTop: '20px',
            borderRadius: '5px',
            backgroundColor: colors.button_bg_primary,
            color: colors.const_dark_text,
        }}
      >
        {altText ? altText : 'a pretty girl'}
    </div>
    );
  };

  return (
      <div 
        className=''>
          <div 
            className=''
            style={{
              backgroundColor: colors.content_bg_dark,
              paddingTop: '20px',
              paddingRight: '20px',
              paddingLeft: '20px',
              paddingBottom: '30px',
              borderRadius: '5px',
            }}>
            {loading ? ((loading && imgURL) ? "" : progressLine()) : ""}
            {loading ? ((loading && imgURL) ? generatedImage() : SkeletonImg()) : defaultImage()}
            {loading ? ((loading && imgURL) ? generatedImagePrompt() : SkeletonPrompt()) : defaultImagePrompt()}
            {/* <Minter /> */}
        </div>
      </div>
  );
};

export default GeneratedImage;