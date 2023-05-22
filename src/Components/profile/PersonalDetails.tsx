import React from 'react';
import styles from '@/styles/profile.module.css';
import {Mulish} from 'next/font/google';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Divider } from '@mui/material';
import UpdateShipping from '@/Components/profile/UpdateShipping';
import UpdateInformation from '@/Components/profile/UpdateInformation';

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})

const PersonalDetails: NextPage = (): JSX.Element => {

    const { status, data } = useSession() as any;

    return (
        <div className={[mulish.className, styles.personalDetailsOrdersDiv].join(" ")}>
            <h2>Personal Details</h2>
            <div className={styles.infoContainer}>
                <div className={styles.boxLayout}>
                    <h3>Shipping address</h3>
                    <p>City: {data.user?.address.city}</p>
                    <p>Street name: {data.user?.address.street_name}</p>
                    <p>Street address: {data.user?.address.street_address}</p>
                    <UpdateShipping />
                </div>
                <Divider variant='middle'/>
                <div className={styles.boxLayout}>
                    <h3>Personal details</h3>
                    <p>Name: {data.user?.name}</p>
                    <p>Email: {data.user?.email}</p>
                    <p>Birthdate: {data.user?.birthday}</p>
                    <UpdateInformation />
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails