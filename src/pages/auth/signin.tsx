import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState  } from 'react'; 

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {

    const [userInfo, setUserInfo] = useState({username: '', password: ''})
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        //Validate your user info
        e.preventDefault();
        const res = await signIn('credentials', {
            username: userInfo.username,
            password: userInfo.password,
            redirect: false
        });

        console.log(res);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input value={userInfo.username} onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })} type="text" placeholder='username'/>
                <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder='*********'/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
};

export default SignIn;