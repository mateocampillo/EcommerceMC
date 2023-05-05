'use client';
import React, {useState} from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/profile.module.css';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router';
import { useEffect} from 'react';
import Loading from '@/Components/Loading';
import PersonalDetails from '@/Components/profile/PersonalDetails';
import PersonalOrders from '@/Components/profile/PersonalOrders';


const Profile: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;
    const [ page, setPage ] = useState('personalDetails');

    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
    }, [status]);

    let renderComponent;
    if(page === 'personalDetails'){
        renderComponent = <PersonalDetails />
    } else if (page === 'orders'){
        renderComponent = <PersonalOrders />
    }

    function logOutAndEraseCart(): void {
        signOut();
        localStorage.removeItem('persist:root');
    }

    if (status === 'authenticated'){

        return (
            <>
                <HeadComponent title='User Profile' />
                <ProSidebarProvider>
                    <Sidebar />
                    <Banner />
                    <main className={[mulish.className, styles.profileContainer].join(" ")}>
                        <nav className={styles.nav}>
                            <div>
                                <h2>Hi {data.user?.name}!</h2>
                            </div>
                            <ul className={styles.ul}>
                                <li onClick={() => setPage('personalDetails')}><h2>Personal details</h2></li>
                                <li onClick={() => setPage('orders')}><h2>My orders</h2></li>
                                <li onClick={() => logOutAndEraseCart()}><h2>Logout</h2></li>
                            </ul>
                        </nav>
                    {renderComponent}
                    </main>
                    <Footer />
                </ProSidebarProvider>
            </>
        )
    }

    return (
        <Loading />
    )
}

export default Profile