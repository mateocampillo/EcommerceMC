import React, {useState, useRef, FormEventHandler} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Menu, MenuItem } from 'react-pro-sidebar';
import {FaRegCommentDots} from 'react-icons/fa';
import styles from '@/styles/modalComments.module.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Script from 'next/script';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useRef<HTMLFormElement>(null);
    const [fullNameValue, setFullNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [messageValue, setMessageValue] = useState('');

    const sendEmail: FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        emailjs.sendForm('contact_storehub', 'contact_form', form.current!, 'AEwW306LNkaU8JGZH')
            .then((result) => {
                handleClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Email sent.'
                  })
            }, (error) => {
                handleClose();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error! Try contacting me via LinkedIn.'
                  })
            });
        }

    return (
        <div>
            <Menu><MenuItem onClick={handleOpen}><FaRegCommentDots className={styles.sidebarIcons}/>Leave a comment!</MenuItem></Menu>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-for-comments"
                aria-describedby="modal-box-for-leaving-comments"
            >
                <Box className={styles.modalContainer}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave a comment!
                    </Typography>
                    <form ref={form} onSubmit={sendEmail} id="contact-form">
                        <div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputName" className={styles.input} name='user_name' label="Full Name" variant="outlined" type='text' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setFullNameValue(e.target.value)}
                                error={fullNameValue.length <= 2}
                                helperText={fullNameValue.length <= 2 ? "Minimun length: 3" : ""}/></div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputEmail" className={styles.input} name='user_email' label="Email" variant="outlined" type='email' color='secondary' required
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    error={!emailValue.includes('@')}
                                    helperText={!emailValue? "Introduce an email" : "" || !emailValue.includes('@')? 'Invalid email' : ''}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputMessage" className={styles.input} name='message' variant="outlined" label="Message" multiline type='text' color='secondary' maxRows={4} required inputProps={{minLength: 10}}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                    error={messageValue.length < 10}
                                    helperText={messageValue.length < 10? "Minimun length: 10" : ""}/>
                            </div>
                            <Button id="buttonSubmit" type='submit'>Send</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Script src='https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'/>
        </div>
    );
}