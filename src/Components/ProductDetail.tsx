import React from 'react';
import styles from '@/styles/productDetail.module.css';

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
  category: string;
  description: string;
}

export default function ProductDetail(props:propList) {

  return (
    <>
        <h2 className={styles.h2}>{props.title}</h2>
    </>
  )
}
