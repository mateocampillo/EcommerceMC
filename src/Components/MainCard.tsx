import React from 'react';
import styles from '@/styles/cardComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import { Source_Sans_Pro } from 'next/font/google'

interface propList{
  title: string;
  image: string;
  category: string;
}

const ssp = Source_Sans_Pro({weight: ['400'], style: ['normal'], subsets: ['latin']})

export default function CardComponent(props:propList) {

  return (
    <div className={styles.container}>
      <div><Link href={`/products?query=${props.category}`} className={styles.containerCardImage}><Image className={styles.cardImage} width={'200'} height={'200'} src={props.image} alt='foto de producto'/></Link></div>
      <Divider variant='middle'/>
      <div className={[styles.containerTitle, ssp.className].join(" ")}><Link href={`/products?query=${props.category}`}><h4>{props.title.toUpperCase()}</h4></Link></div>
    </div>
  )
}
