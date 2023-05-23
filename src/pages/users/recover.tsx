import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/login.module.css';
import Banner from '@/Components/Banner';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import ForgotPasswordForm from '@/Components/auth/ForgotPasswordForm';
import {Mulish, Roboto_Condensed} from 'next/font/google';
import Popper from '@/Components/Popper';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
const roboto_c = Roboto_Condensed({weight: ['400'], style: ['normal'], subsets: ['latin']})

function Recover() {

  return (
    <>
      <HeadComponent title='User Password Recovery' />
      <ProSidebarProvider>
        <Sidebar />
        <Banner />
        <main className={[styles.mainContainer, mulish.className].join(" ")}>
            <div className={styles.titles}>
              <h1 className={roboto_c.className}>Your Store Hub account</h1>
            </div>
            <section className={styles.sectionContainer}>
                <div className={styles.iconContainer}>
                    <h3 className={roboto_c.className}>Recover your account.</h3>
                    <Popper title={'To recover:'} firstInput={'- email: useremail@gmail.com'} secondInput={'- social: 12345678'}/>
                </div>
                <div className={styles.formContainer}>
                    <ForgotPasswordForm />
                </div>
                <Divider variant="middle" />
                <div className={styles.registerHere}>
                    <p>Got a new password? <Link href={'/users/login'}>Go to login!</Link></p>
                    <p>No account yet? <Link href={'/users/register'}>Register here!</Link></p>
                </div>
            </section>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export default Recover