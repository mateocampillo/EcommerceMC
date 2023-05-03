'use client';
import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/profile.module.css';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect} from 'react';
import Loading from '@/Components/Loading';


const Profile: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
    }, [status]);

    if (status === 'authenticated'){

        return (
            <>
                <HeadComponent title='User Profile' />
                <ProSidebarProvider>
                    <Sidebar />
                    <Banner />
                    <main className={mulish.className}>
                        <p>user logged: {data.user?.name}</p>
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