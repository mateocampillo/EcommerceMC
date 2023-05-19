import React from 'react';
import styles from '@/styles/cardId.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import RatingStars from '@/Components/RatingStars';
import { Source_Sans_Pro } from 'next/font/google'

interface ratingObject{
  rate: number;
  count: number;
}
interface propList{
  title: string;
  image: string;
  id: number;
  rating: ratingObject;
  price: number;
}

const ssp = Source_Sans_Pro({weight: ['400'], style: ['normal'], subsets: ['latin']})

export default function CardComponent(props:propList) {

  return (
    <div className={styles.container}>
      <div><Link href={`/products/${props.id}`} className={styles.containerCardImage}><Image className={styles.cardImage} fill objectFit='contain' src={props.image} alt='foto de producto'/></Link></div>
      <Divider variant='middle'/>
      <div className={styles.containerTitle}>
        <Link href={`/products/${props.id}`}><h4>{props.title}</h4></Link>
        <RatingStars rating={props.rating.rate} count={props.rating.count}/>
        <div className={[styles.containerDetails, ssp.className].join(" ")}>
          <Link href={`/products/${props.id}`}>Details</Link>
          <p>&#36;{props.price}</p>
        </div>
      </div>
    </div>
  )
}
