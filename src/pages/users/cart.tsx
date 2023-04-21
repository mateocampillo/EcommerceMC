import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/cart.module.css';
import Banner from '@/Components/Banner';
import {Mulish, Roboto_Condensed} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
const roboto_c = Roboto_Condensed({weight: ['400'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';
import Loading from '@/Components/Loading';

const Cart: NextPage = (): JSX.Element => {

    const { status, data } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
    }, [status]);

    if (status === 'authenticated'){
        return (
            <>
                <HeadComponent title='User Cart' />
                <ProSidebarProvider>
                    <Sidebar />
                    <Banner />
                    <main className={[styles.mainContainer, mulish.className].join(" ")}>
                        Cart
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

export default Cart