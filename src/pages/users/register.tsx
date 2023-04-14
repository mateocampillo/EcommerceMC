import React from 'react';
React.useLayoutEffect = React.useEffect
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/register.module.css';
import Banner from '@/Components/Banner';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import FormRegister from '@/Components/FormRegister';
import {Mulish, Roboto_Condensed} from 'next/font/google';

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
const roboto_c = Roboto_Condensed({weight: ['400'], style: ['normal'], subsets: ['latin']})

function Register() {

  return (
    <>
      <HeadComponent title='User Register' />
      <ProSidebarProvider>
        <Sidebar />
        <Banner />
        <main className={[styles.mainContainer, mulish.className].join(" ")}>
            <div className={styles.titles}>
              <h1 className={roboto_c.className}>Your Store Hub account</h1>
              <p>Have an account? <Link href={'/'}>Login here!</Link></p>
            </div>
            <Divider variant="middle" />
            <section className={styles.sectionContainer}>
                <h3 className={roboto_c.className}>Sign up with email.</h3>
                <div className={styles.formContainer}>
                  <FormRegister />
                </div>
            </section>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export default Register