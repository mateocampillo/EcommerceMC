import React from 'react';
import styles from '@/styles/profile.module.css';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';


const PersonalOrders: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    return (
        <div className={[mulish.className, styles.ordersDiv].join(" ")}>
            <h2>Personal Orders Component</h2>
        </div>
    )
}

export default PersonalOrders