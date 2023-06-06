import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/login.module.css';
import Banner from '@/Components/Banner';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import SignIn from '@/Components/auth/SignIn';
import {Mulish, Roboto_Condensed} from 'next/font/google';
import Popper from '@/Components/Popper';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
const roboto_c = Roboto_Condensed({weight: ['400'], style: ['normal'], subsets: ['latin']})

function Login() {

  return (
    <>
      <HeadComponent title='User Login' />
      <ProSidebarProvider>
        <Sidebar />
        <Banner />
        <main className={[styles.mainContainer, mulish.className].join(" ")}>
            <div className={styles.titles}>
              <h1 className={roboto_c.className}>Your Store Hub account</h1>
            </div>
            <section className={styles.sectionContainer}>
                <div className={styles.iconContainer}>
                    <h3 className={roboto_c.className}>Log in with email.</h3>
                    <Popper title={'To login:'} firstInput={'- username: userLogin'} secondInput={'- password: 1234'}/>
                </div>
                <div className={styles.formContainer}>
                    <SignIn />
                </div>
                <Divider variant="middle" />
                <div className={styles.registerHere}>
                    <p>No account yet? <Link href={'/users/register'}>Register here!</Link></p>
                </div>
            </section>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export default Login