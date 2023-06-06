import React, {useState, useRef, FormEventHandler} from 'react';
import styles from '@/styles/formRegister.module.css';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Router from 'next/router';

function FormRegister() {

    const form = useRef<HTMLFormElement>(null);
    const [fullNameValue, setFullNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstPassValue, setFirstPassValue] = useState('');
    const [secondPassValue, setSecondPassValue] = useState('');
    const [birthdayValue, setBirthdayValue] = useState('');
    const [newsletterValue, setNewsletterValue] = useState(false);
    const [tosValue, setTosValue] = useState(false);

    const handleForm: FormEventHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(tosValue === true){
            if(firstPassValue === secondPassValue){
                setPasswordValue(firstPassValue);
                fetch('https://fakestoreapi.com/users', {
                    method:"POST",
                    body: JSON.stringify(
                        {
                            email: emailValue,
                            password: passwordValue,
                            username: usernameValue,
                            name:{
                                firstname: fullNameValue,
                                lastname: lastNameValue
                            },
                            birthday: birthdayValue !== '' ? birthdayValue : null,
                            newsletter: newsletterValue
                        }
                    )
                })
                .then(res => res.json())
                .then(json => console.log(json))
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Remember this is a only a frontend project, no real user is created!'
                })
                Router.replace('/users/login');
            } else {
                alert('passwords are different');
                document.getElementById('cr_pass')?.focus();
            }
        } else {
            alert('error en TOS')
        }
    }

    return (
        <form ref={form} onSubmit={handleForm} className={styles.formContainer}>
            <div className={styles.container}>
                <label htmlFor="first_name">First name</label>
                <input type="text" name="first_name" id="first_name" required onChange={(e) => setFullNameValue(e.target.value)} minLength={3} maxLength={30}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="last_name">Last name</label>
                <input type="text" name="last_name" id="last_name" required onChange={(e) => setLastNameValue(e.target.value)} minLength={3} maxLength={30}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" required onChange={(e) => setUsernameValue(e.target.value)} minLength={3} maxLength={30}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required onChange={(e) => setEmailValue(e.target.value)}/>
            </div>
            
            <div className={styles.container}>
                <label htmlFor="cr_pass">Create password</label>
                <input type="password" name="cr_pass" id="cr_pass" required onChange={(e) => setFirstPassValue(e.target.value)} minLength={6} maxLength={10}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="rp_pass">Confirm password</label>
                <input type="password" name="rp_pass" id="rp_pass" required onChange={(e) => setSecondPassValue(e.target.value)} minLength={6} maxLength={10}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="birthday">Birthday &#40;Optional&#41;</label>
                <input type="date" name="birthday" id="birthday" onChange={(e) => setBirthdayValue(e.target.value)}/>
            </div>
            <div className={styles.containerCheckbox}>
                <input type="checkbox" name="newsletter" id="newsletter" onChange={(e) => setNewsletterValue(e.target.checked)}/>
                <label htmlFor="newsletter">Subscribe to our newsletter &#40;Optional&#41;</label>
            </div>
            <div className={styles.containerCheckbox}>
                <input type="checkbox" name="tos" id="tos" required onChange={(e) => setTosValue(e.target.checked)}/>
                <label htmlFor="tos">I&#39;ve read the <Link href={'#'}>Terms of Service</Link> and <Link href={'#'}>Privacy Policy</Link> of Storehub.com</label>
            </div>
            <div className={styles.containerBoton}>
                <button type="submit">Sign up</button>
            </div>
        </form>
    )
}

export default FormRegister;