import React, {useState, useRef, FormEventHandler} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '@/styles/modalComments.module.css';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import {Mulish} from 'next/font/google';

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function UpdateInformation() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useRef<HTMLFormElement>(null);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [birthdateValue, setBirthdateValue] = useState('');
    const [touched, setTouched] = useState(false);

    const handleForm: FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('https://fakestoreapi.com/users', {
            method:"PUT",
            body: JSON.stringify(
                {
                    name: nameValue,
                    email: emailValue,
                    birthdate: birthdateValue
                }
            )
        })
        .then(res => res.json())
        .then(json => console.log(json))
        handleClose();
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Remember this is a frontend project, so no info is updated on the database'
        })
    }

    const handleTouch = () => {
        setTouched(true);
    };

    return (
        <div>
            <h4>&#62; <button onClick={handleOpen}>Update personal details</button></h4>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-for-updating-personal-info"
                aria-describedby="modal-for-updating-personal-info"
            >
                <Box className={styles.modalContainer}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update your personal info!
                    </Typography>
                    <form ref={form} onSubmit={handleForm} id="contact-form">
                        <div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputName" className={styles.input} name='name' label="Name" variant="outlined" type='text' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setNameValue(e.target.value)}
                                onFocus={handleTouch}
                                error={touched && nameValue.length <= 2}
                                helperText={nameValue.length <= 2 ? "Minimun length: 3" : ""}/></div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputEmail" className={styles.input} name='email' label="Email" variant="outlined" type='email' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setEmailValue(e.target.value)}
                                onFocus={handleTouch}
                                error={touched && !emailValue.includes('@')}
                                helperText={!emailValue.includes('@')? "Not a valid email" : ""}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputBirthdate" className={styles.input} name='birthdate' variant="outlined" type='date' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setBirthdateValue(e.target.value)}
                                onFocus={handleTouch}/>
                            </div>
                            <button id="buttonSubmit" type='submit' className={mulish.className}>Send</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}