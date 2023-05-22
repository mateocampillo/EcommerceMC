import React, {useState, useRef, FormEventHandler} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '@/styles/modalComments.module.css';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import {Mulish} from 'next/font/google';

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function UpdateShipping() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useRef<HTMLFormElement>(null);
    const [streetNameValue, setStreetNameValue] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [streetAddressValue, setStreetAddressValue] = useState('');
    const [touched, setTouched] = useState(false);

    const handleForm: FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('https://fakestoreapi.com/users', {
            method:"PUT",
            body: JSON.stringify(
                {
                    city: cityValue,
                    streetName: streetNameValue,
                    streetAddress: streetAddressValue
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
            <h4>&#62; <button onClick={handleOpen}>Update shipping address</button></h4>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-for-updating-shipping-info"
                aria-describedby="modal-for-updating-shipping-info"
            >
                <Box className={styles.modalContainer}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update your shipping info!
                    </Typography>
                    <form ref={form} onSubmit={handleForm} id="contact-form">
                        <div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputCity" className={styles.input} name='city' label="City" variant="outlined" type='text' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setCityValue(e.target.value)}
                                onFocus={handleTouch}
                                error={touched && cityValue.length <= 2}
                                helperText={cityValue.length <= 2 ? "Minimun length: 3" : ""}/></div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputStreetName" className={styles.input} name='streetName' label="Street Name" variant="outlined" type='text' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setStreetNameValue(e.target.value)}
                                onFocus={handleTouch}
                                error={touched && streetNameValue.length <= 2}
                                helperText={streetNameValue.length <= 2? "Minimun length: 3" : ""}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField id="inputStreetAddress" className={styles.input} name='streetAddress' variant="outlined" label="Street Address" type='text' color='secondary' required inputProps={{minLength: 3}}
                                onChange={(e) => setStreetAddressValue(e.target.value)}
                                onFocus={handleTouch}
                                error={touched && streetAddressValue.length <= 2}
                                helperText={streetAddressValue.length <= 2? "Minimun length: 3" : ""}/>
                            </div>
                            <button id="buttonSubmit" type='submit' className={mulish.className}>Send</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}