'use client';
import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/cart.module.css';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/Components/Loading';
import { useAppSelector } from '../../../store/store';
import { totalPriceSelector } from '../../../store/features/cartSlice';
import CartItemComponent from '@/Components/CartItemComponent';
import Image from 'next/image';
import { Divider } from '@mui/material';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { CartItem } from '../../../interfaces';
import dayjs from 'dayjs';


const Cart: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const totalPrice = useAppSelector(totalPriceSelector);
    const taxPrice = (totalPrice*10) / 100;


    useEffect(() => {
        if (status === 'unauthenticated'){
            Router.replace('/users/login');
        }
        if (status === 'authenticated'){
            let name = document.getElementById('inputFullName') as HTMLInputElement;
            name.defaultValue = data.user.name;
            let email = document.getElementById('inputEmail') as HTMLInputElement;
            email.defaultValue = data.user.email;
            let streetName = document.getElementById('inputStreetName') as HTMLInputElement;
            streetName.defaultValue = data.user.address.street_name;
            let streetAddress = document.getElementById('inputStreetAddress') as HTMLInputElement;
            streetAddress.defaultValue = data.user.address.street_address;
            let city = document.getElementById('inputCity') as HTMLInputElement;
            city.defaultValue = data.user.address.city;
        }
    }, [status, data]);

    function formatCreditCard() {
        let ccNumber = document.getElementById('cardValue') as HTMLInputElement;
        var index = ccNumber.value.lastIndexOf('-');
        var test = ccNumber.value.substring(index + 1);
        if (test.length === 4 && ccNumber.value.length < 16){
            ccNumber.value = ccNumber.value + '-';
        }
        let ccDate = document.getElementById('dateValue') as HTMLInputElement;
        var index = ccDate.value.lastIndexOf('/');
        var test = ccDate.value.substring(index + 1);
        if (test.length === 2 && ccDate.value.length < 4){
            ccDate.value = ccDate.value + '/';
        }
    }

    function handlePay() {
        let cardValue = (document.getElementById("cardValue") as HTMLInputElement ).value;
        let nameValue = (document.getElementById("nameValue") as HTMLInputElement ).value;
        let dateValue = (document.getElementById("dateValue") as HTMLInputElement ).value;
        let ccvValue = (document.getElementById("ccvValue") as HTMLInputElement ).value;
        if( cardValue.length != 19 || nameValue.length < 3 || dateValue.length != 5 || ccvValue.length < 3){
            Swal.fire({
                icon: 'error',
                title: 'Wrong Information',
                text: 'Please check if your card details are correct.'
            })
        } else {
            let previousOrders = localStorage.getItem(`${data.user?.userId}_orders`);
            if(previousOrders === null){
                cartItems.forEach((item, index) => {
                    const date = dayjs().format('DD/MM/YY HH:mm');
                    const shipDay = dayjs().add(7, 'day').format('DD/MM/YY');
                    cartItems[index] = {...item, datePurchased: date, shipDate: shipDay};
                })
                localStorage.setItem(`${data.user?.userId}_orders`, JSON.stringify(cartItems));
            } else {
                let newArr: Array<CartItem> = [];
                cartItems.forEach((item: CartItem, index) => {
                    const date = dayjs().format('DD/MM/YY HH:mm');
                    const shipDay = dayjs().add(7, 'day').format('DD/MM/YY');
                    cartItems[index] = {...item, datePurchased: date, shipDate: shipDay};
                    newArr.push(cartItems[index]);
                })
                JSON.parse(previousOrders).forEach((item: CartItem) => {
                    newArr.push(item)
                })
                localStorage.removeItem(`${data.user?.userId}_orders`);
                localStorage.setItem(`${data.user?.userId}_orders`, JSON.stringify(newArr));
            }
            localStorage.removeItem('persist:root');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'An email will be sent with all your order information!'
            })
            Router.replace('/');
        }
    }

    if (status === 'authenticated'){

        if(cartItems.length === 0) {
            return (
                <>
                <HeadComponent title='User Cart' />
                <ProSidebarProvider>
                    <Sidebar />
                    <Banner />
                    <main className={mulish.className}>
                        <div className={styles.emptyCartContainer}>
                        <div>
                                <Image alt='error' src={'https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso.jpg'} fill/>
                            </div>
                            <h1>No items in your cart!</h1>
                            <p>It looks like you haven&#39;t added any products to your cart, why don&#39;t you go ahead and look at our top categories!</p>
                            <Link href='/products?query=all'>Browse products</Link>
                        </div>
                    </main>
                    <Footer />
                </ProSidebarProvider>
            </>
            )
        }

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
                            <p className={styles.priceTotal}>Total: <strong>&#36; {totalPrice.toFixed(2)}</strong></p>
                        </section>
                        <section className={[styles.section, styles.userInformation].join(" ")}>
                            <h2>Delivery Information</h2>
                            <div className={styles.inputContainer}>
                                <p>Full name:</p>
                                <input type="text" id='inputFullName' required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Contact Email:</p>
                                <input type="email" id='inputEmail' required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Street Name:</p>
                                <input type="text" id='inputStreetName' required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Street Address:</p>
                                <input type="text" id='inputStreetAddress' required/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>City:</p>
                                <input type="text" id='inputCity' required/>
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
                                <form id='cardForm'>
                                    <div className={styles.cardInputContainer}>
                                        <label htmlFor="">Card Number</label>
                                        <input type="text" onKeyUp={formatCreditCard} required minLength={19} maxLength={19} placeholder='1234-1234-1234-1234' id='cardValue'/>
                                    </div>
                                    <div className={styles.cardInputContainer}>
                                        <label htmlFor="">Card Holder Name</label>
                                        <input type="text" placeholder='John Doe' minLength={3} id='nameValue'/>
                                    </div>
                                    <div className={styles.expireCCV}>
                                        <div className={styles.cardInputContainer}>
                                            <label htmlFor="">Expire Date</label>
                                            <input type="text" onKeyUp={formatCreditCard} placeholder='01/01' id='dateValue' minLength={4} maxLength={5}/>
                                        </div>
                                        <div className={styles.cardInputContainer}>
                                            <label htmlFor="">CCV</label>
                                            <input type="number" placeholder='123' id='ccvValue'/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={styles.pricesContainer}>
                                <div className={styles.div}>
                                    <p><strong>Subtotal: $ {totalPrice.toFixed(2)}</strong></p>
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
                            <button onClick={handlePay}>Pay</button>
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