import { NextPage } from 'next';
import { FormEventHandler, useState  } from 'react'; 
import styles from '@/styles/signIn.module.css';
import Swal from 'sweetalert2';

const ForgotPasswordForm: NextPage = (): JSX.Element => {

    const [userInfo, setUserInfo] = useState({email: '', newPassword: '', socialNumber: 0})
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        //Validate your user info
        e.preventDefault();
        if(userInfo.email === 'useremail@gmail.com' && userInfo.socialNumber === 12345678){
            fetch('https://fakestoreapi.com/users', {
                method:"PUT",
                body: JSON.stringify(
                    {
                        email: userInfo.email,
                        socialNumber: userInfo.socialNumber,
                        newPassword: userInfo.newPassword
                    }
                )
            })
            .then(res => res.json())
            .then(json => console.log(json))
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Remember this is a frontend project, so no info is updated on the database'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Wrong Information!',
                text: 'Remember this is a frontend project, so no new user info is stored, please check the values set above the form to test this fetch.'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.container}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' required
                    value={userInfo.email}
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                />
            </div>
            <div className={styles.container}>
                <label htmlFor="socialNumber">Social insurance number</label>
                <input type="number" name='socialNumber' id='socialNumber' required
                    value={userInfo.socialNumber}
                    onChange={({ target }) => setUserInfo({ ...userInfo, socialNumber: parseInt(target.value) })}
                />
            </div>
            <div className={styles.container}>
                <label htmlFor="password">New password</label>
                <input type="password" name='password' id='password' required
                    value={userInfo.newPassword}
                    onChange={({ target }) => setUserInfo({ ...userInfo, newPassword: target.value })}
                />
            </div>
            <div className={styles.containerBoton}>
                <input type="submit" value="Recover account"/>
            </div>
        </form>
    )
};

export default ForgotPasswordForm;