import React, {useState, useRef, FormEventHandler} from 'react';
import styles from '@/styles/formLogin.module.css';
import Link from 'next/link';

function FormRegister() {

    const form = useRef<HTMLFormElement>(null);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleForm: FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('https://fakestoreapi.com/auth/login', {
            method:"POST",
            body: JSON.stringify(
                {
                    username: usernameValue,
                    password: passwordValue,
                }
            )
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    return (
        <form ref={form} onSubmit={handleForm}>
            <div className={styles.container}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" required onChange={(e) => setUsernameValue(e.target.value)}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required onChange={(e) => setPasswordValue(e.target.value)} minLength={6} maxLength={10}/>
            </div>
            <div className={styles.containerForgot}>
                <p><Link href={'/users/login'}>Forgot your password?</Link></p>
            </div>
            <div className={styles.containerBoton}>
                <button type="submit">Log in</button>
            </div>
        </form>
    )
}

export default FormRegister;