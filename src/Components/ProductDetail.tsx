import React from 'react';
import styles from '@/styles/productDetail.module.css';
import Breadcrumbs from '@/Components/Breadcrumbs';

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
        <nav>
            <Breadcrumbs arr={[
                {key: 'home', text: 'Home', href: '/'},
                {key: 'product', text: 'Products', href: '/products?query=all'},
                {key: 'category', text: `${props.category}`, href: `/products?query=${props.category}`},
                {key: 'item', text: `${props.title}`, href: `/products/${props.id}`},
            ]}/>
        </nav>
        <section>
            <h2 className={styles.h2}>{props.title}</h2>
        </section>
    </>
  )
}
