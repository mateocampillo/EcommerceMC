import React from 'react';
import styles from '@/styles/productDetail.module.css';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Image from 'next/image';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
import RatingStars from '@/Components/RatingStars';

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

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function ProductDetail(props:propList) {

  const [stock, setStock] = React.useState<number>(1);

  function getRandomInt(max: number){
    return Math.floor(Math.random() * max);
  }
  React.useEffect(() => {
    setStock(getRandomInt(20))
  }, [])

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
        <section className={mulish.className}>
            <h1 className={styles.h1}>{props.title}</h1>
            <div className={styles.imgContainer}>
              <Image alt='imagen de producto' src={props.image} fill objectFit='contain'/>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.description}>{props.description}</p>
              <div className={styles.divRatingStars}>
                <RatingStars rating={props.rating.rate} count={props.rating.count}/>
              </div>
              <div className={styles.amountContainer}>
                <div className={styles.amount}>
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <p>Only <strong>{stock}</strong> items left! Don&#39;t miss it!</p>
              </div>
              <div className={styles.actionButtons}>
                <button>Buy Now</button>
                <button>Add To Cart</button>
              </div>
            </div>
        </section>
    </>
  )
}
