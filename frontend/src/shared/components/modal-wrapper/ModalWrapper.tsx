import { Box, Dialog } from '@mui/material';
import React from 'react';
import { ModalWrapperStyle } from './modal-wrapper.style';

type ModalWrapperProps = {
    open: boolean;
    handleClose?: () => void
}

const ModalWrapper = ({ children, open, handleClose }: React.PropsWithChildren<ModalWrapperProps>): JSX.Element => {
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={ModalWrapperStyle}>
                {children}
            </Box>
        </Dialog>
    );
};

export default ModalWrapper;