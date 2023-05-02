'use client';
import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/cart.module.css';
import Banner from '@/Components/Banner';
import {Mulish, Roboto_Condensed} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect} from 'react';
import Loading from '@/Components/Loading';
import { useAppSelector } from '../../../store/store';
import { totalPriceSelector } from '../../../store/features/cartSlice';
import CartItemComponent from '@/Components/CartItemComponent';
import Image from 'next/image';
import { Divider } from '@mui/material';

const Cart: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const totalPrice = useAppSelector(totalPriceSelector);
    const taxPrice = (totalPrice*10) / 100;

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
                    <main className={mulish.className}>
                        <section className={[styles.section, styles.cart].join(" ")}>
                            <h1>Review Items and Shipping</h1>
                            <ul>
                                {cartItems.map((item) => (
                                    <CartItemComponent cartItem={item} key={item.product.id}/>
                                ))}
                            </ul>
                            <p className={styles.priceTotal}>Total: <strong>&#36; {totalPrice}</strong></p>
                        </section>
                        <section className={[styles.section, styles.userInformation].join(" ")}>
                            <h2>Delivery Information</h2>
                            <div className={styles.inputContainer}>
                                <p>Full name:</p>
                                <input type="text" value={data.user?.name} required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Contact Email:</p>
                                <input type="email" value={data.user?.email} required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Street Name:</p>
                                <input type="text" value={data.user?.address.street_name} required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Street Address:</p>
                                <input type="text" value={data.user?.address.street_address} required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>City:</p>
                                <input type="text" value={data.user?.address.city} required/>
                            </div>
                        </section>
                        <section className={[styles.section, styles.orderSummary].join(" ")}>
                            <h2>Order summary</h2>
                            <div className={styles.cardsImagesContainer}>
                                <p>Payment Options</p>
                                <div className={styles.cardsImages}>
                                    <Image alt='mastercard' src={'/img/visa.png'} width={50} height={50}/>
                                    <Image alt='mastercard' src={'/img/mastercard.png'} width={50} height={50}/>
                                </div>
                            </div>
                            <div>
                                <div className={styles.cardInputContainer}>
                                    <label htmlFor="">Card Number</label>
                                    <input type="number" required minLength={16} placeholder='0000-0000-0000-0000'/>
                                </div>
                                <div className={styles.cardInputContainer}>
                                    <label htmlFor="">Card Holder Name</label>
                                    <input type="text" required placeholder='John Doe'/>
                                </div>
                                <div className={styles.expireCCV}>
                                    <div className={styles.cardInputContainer}>
                                        <label htmlFor="">Expire Date</label>
                                        <input type="text" required placeholder='01/12'/>
                                    </div>
                                    <div className={styles.cardInputContainer}>
                                        <label htmlFor="">CCV</label>
                                        <input type="number" required placeholder='123'/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pricesContainer}>
                                <div className={styles.div}>
                                    <p><strong>Subtotal: $ {totalPrice}</strong></p>
                                </div>
                                <div className={styles.div}>
                                    <p><strong>Tax &#40;10&#37;&#41;: $ {taxPrice.toFixed(2)}</strong></p>
                                </div>
                                <Divider variant='middle'/>
                                <div className={styles.div}>
                                    <p><strong>Total: $ {(totalPrice+taxPrice).toFixed(2)}</strong></p>
                                </div>
                            </div>
                        </section>
                        <div className={styles.payButton}>
                            <button>Pay</button>
                        </div>
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