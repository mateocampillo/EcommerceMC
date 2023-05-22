import React from 'react';
import styles from '@/styles/profile.module.css';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CartItem } from '../../../interfaces';

const PersonalOrders: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    let orders = JSON.parse(localStorage.getItem(`${data.user?.userId}_orders`)!);
    if(orders !== null){
        return (
            <div className={[mulish.className, styles.personalDetailsOrdersDiv].join(" ")}>
                <h2>Completed Orders</h2>
                <div className={styles.infoContainer}>
                    {orders.map((item: CartItem) => {
                        return (
                        <div className={styles.boxLayout} key={item.product.id}>
                            <h3>Item: {item.product.title}</h3>
                            <p>Quantity: {item.qty}</p>
                            <p>Item category: {item.product.category}</p>
                            <p>Price paid: <strong>$ {item.product.price * item.qty}</strong></p>
                            <p>Purchased: {item.datePurchased}</p>
                            <p>Arrival date: {item.shipDate}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className={[mulish.className, styles.personalDetailsOrdersDiv].join(" ")}>
            <h2>You haven&#39;t ordered anything yet!</h2>
            <div className={styles.infoContainer}>
                <div className={styles.boxLayout}>
                    <h4>&#62; <Link href={'/products?query=all'}>Check out new products</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default PersonalOrders