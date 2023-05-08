import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem } from 'react-pro-sidebar';
import stylesSidebar from '@/styles/sidebar.module.css';
import stylesModal from '@/styles/modalComments.module.css';
import { useSession, signOut } from 'next-auth/react';
import {BiLogOutCircle} from 'react-icons/bi';


export default function BasicModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { status, data } = useSession() as any;

    function logOutAndEraseCart(): void {
        localStorage.removeItem('persist:root');
        localStorage.removeItem(`${data.user?.userId}_orders`);
        signOut();
    }

    return (
        <>
            <li onClick={handleOpen}><h2>Logout</h2></li>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-for-comments"
                aria-describedby="modal-box-for-leaving-comments"
            >
                <Box className={stylesModal.modalContainer}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm logout?
                    </Typography>
                    <div className={stylesModal.logoutButtonContainer}>
                        <button onClick={() => logOutAndEraseCart()}>Log out</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}