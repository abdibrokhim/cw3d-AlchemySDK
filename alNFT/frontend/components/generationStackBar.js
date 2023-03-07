import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const generationStackBar = ({ onAlert }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        console.log('Alert: ', onAlert);
        setOpen(true);
    }, [onAlert===true]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white'}}>
                This is a success message!
            </Alert>
        </Snackbar>
        </Stack>
    );
};