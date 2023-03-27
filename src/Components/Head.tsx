import React from 'react';
import Head from 'next/head';

interface propList{
    title: string;
}

export default function HeadComponent(props:propList) {

    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="StoreHub is an ecommerce created by Mateo Campillo, part of my personal work portfolio. Built with Next.js as a base." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )

}
