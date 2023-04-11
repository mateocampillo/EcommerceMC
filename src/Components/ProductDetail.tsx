import React from 'react';
import styles from '@/styles/productDetail.module.css';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Image from 'next/image';
import Banner from '@/Components/Banner';

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
        <Banner />
        <nav>
            <Breadcrumbs arr={[
                {key: 'home', text: 'Home', href: '/'},
                {key: 'product', text: 'Products', href: '/products?query=all'},
                {key: 'category', text: `${props.category}`, href: `/products?query=${props.category}`},
                {key: 'item', text: `${props.title}`, href: `/products/${props.id}`},
            ]}/>
        </nav>
        <section>
            <h1 className={styles.h1}>{props.title}</h1>
            <div className={styles.imgContainer}>
              <Image alt='imagen de producto' src={props.image} fill objectFit='contain'/>
            </div>
        </section>
    </>
  )
}
