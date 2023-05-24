import React from 'react';
import { useRouter } from 'next/router'
import Icons from '../Icons';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const Wallet = () => {

    const router = useRouter()

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(teal[600]),
        backgroundColor: teal[600],
        borderRadius: '10px',
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
        <>
            <ColorButton 
                variant="contained" 
                type="submit"
                onClick={() => router.push('/profile')}
                >
                    {Icons.wallet}
            </ColorButton>
        </>
    );
};

export default Wallet;