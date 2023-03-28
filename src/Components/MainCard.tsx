import React from 'react';
import styles from '@/styles/cardComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Divider from '@mui/material/Divider';

interface propList{
  title: string;
  image: string;
  id: number;
}

export default function CardComponent(props:propList) {

  return (
    <div className={styles.container}>
      <div><Link href={`/products/${props.id}`} className={styles.containerCardImage}><Image className={styles.cardImage} width={'200'} height={'200'} src={props.image} alt='foto de producto'/></Link></div>
      <Divider variant='middle'/>
      <div className={styles.containerTitle}><Link href={`/products/${props.id}`}><h4>{props.title}</h4></Link></div>
    </div>
  )
}
