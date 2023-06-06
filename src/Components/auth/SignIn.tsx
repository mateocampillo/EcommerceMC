import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState  } from 'react'; 
import styles from '@/styles/signIn.module.css';
import Link from 'next/link';

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {

    const [userInfo, setUserInfo] = useState({username: '', password: ''})
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        //Validate your user info
        e.preventDefault();
        await signIn('credentials', {
            username: userInfo.username,
            password: userInfo.password,
            callbackUrl: '/'
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.container}>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id='username' required
                    value={userInfo.username}
                    onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
                />
            </div>
            <div className={styles.container}>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' required
                    value={userInfo.password}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                />
            </div>
            <div className={styles.containerForgot}>
                <p><Link href={'/users/recover'}>Forgot your password?</Link></p>
            </div>
            <div className={styles.containerBoton}>
                <input type="submit" value="Login"/>
            </div>
        </form>
    )
};

export default SignIn;