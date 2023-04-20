import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';
import Loading from '@/Components/Loading';

const Protected: NextPage = (): JSX.Element => {

    const { status, data } = useSession();
    
    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
    }, [status]);

    if (status === 'authenticated'){
        return (
            <div>
                This page is protected by login. {"\n"}
                {JSON.stringify(data.user)}
            </div>
        )
    }

    return (
        <Loading />
    )
}

export default Protected;