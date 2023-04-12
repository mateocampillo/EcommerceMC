import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import styles from '@/styles/breadcrumb.module.css';
import {MdNavigateNext} from 'react-icons/md';
import { Poppins } from 'next/font/google';

interface bcObject{
    key: string,
    text: string,
    href: string,
}

interface propList{
    arr: Array<bcObject>
}

const poppins = Poppins({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function BasicBreadcrumbs(props: propList) {
  return (
    <div role="presentation" className={styles.divContainer}>
      <Breadcrumbs 
        aria-label="breadcrumb"
        className={[styles.container, poppins.className].join(" ")}
        separator={<MdNavigateNext fontSize="medium" />}>
          {props.arr.map((item) => {
            item.key === 'item' ? item.text = item.text.substring(0,15)+'...' : null;
            return (
                <Link href={item.href} key={item.text}>
                    <p>{item.text}</p>
                </Link>
            )
          })}
      </Breadcrumbs>
    </div>
  );
}