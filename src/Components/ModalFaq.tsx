import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '@/styles/modalFaq.module.css';
import { Heebo } from 'next/font/google';

interface propList{
    titulo: string,
    texto: string,
    icon: ReactNode,
}

const heebo = Heebo({weight: ['500'], style: ['normal'], subsets: ['latin']})

export default function ModalFaq(props: propList) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div className={styles.container}>
        <Button onClick={handleOpen} className={[styles.button, heebo.className].join(" ")}>{props.icon}{props.titulo}</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-faq-questions" aria-describedby="modal-faq-questions">
            <Box className={styles.box}>
            <Typography id="modal-title" className={styles.titulo}>{props.titulo}</Typography>
            <Typography id="modal-description" className={styles.descripcion}>{props.texto}</Typography>
            </Box>
        </Modal>
        </div>
    )
}