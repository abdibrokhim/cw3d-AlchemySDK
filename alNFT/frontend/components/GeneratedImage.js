import React from 'react';
import colors from '../colors';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';

const GeneratedImage = ({ imageURL, altText, isSubmitted }) => {
  
  const [imgURL, setImgURL] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('GeneratedImage() Submit: ', isSubmitted);
    if (isSubmitted === true) {
      setLoading(true);
    }
  }, []);

  React.useEffect(() => {
    console.log('GeneratedImage() Image URL: ', imageURL);
    if (imageURL.length > 0) {
      setLoading(true);
    }
  }, []);

  const progressLine = () => {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color='primary'/>
      </Stack>
    );
  }

  const SkeletonImg = () => {
    return (
        <Skeleton
          sx={{ bgcolor: 'grey.800', borderRadius: '5px', marginTop: '10px'}}
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
        src={imgURL.length > 0 ? imgURL : 'https://cdn.midjourney.com/ce767579-2651-41a9-9d67-e6818a0dd9cd/grid_0.png'}
        alt={altText ? altText : 'an extremely scary yet extremely endearing creature'}
        style={{
            marginTop: '10px',
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
        {altText ? altText : 'an extremely scary yet extremely endearing creature'}
      </div>
    );
  };

  const previewImageText = () => {
    return (
      <div 
        style={{
          color: colors.const_light_text,
          fontSize: '20px',
          fontWeight: 'bold',
        }}   
      >
        Preview
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
            {!loading ? previewImageText() : progressLine()}
            {!loading ? generatedImage() : SkeletonImg()}
            {!loading ? generatedImagePrompt() : SkeletonPrompt()}
        </div>
      </div>
  );
};

export default GeneratedImage;