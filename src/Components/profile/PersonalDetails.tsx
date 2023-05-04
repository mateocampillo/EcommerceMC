import React from 'react';
import styles from '@/styles/profile.module.css';
import {Mulish} from 'next/font/google';
const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';


const PersonalDetails: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    return (
        <div className={[mulish.className, styles.personalDetailsDiv].join(" ")}>
            <h2>Personal Details Component</h2>
        </div>
    )
}

export default PersonalDetails