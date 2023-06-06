'use client';
import React from 'react';
import styles from '@/styles/productDetail.module.css';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Image from 'next/image';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
import RatingStars from '@/Components/RatingStars';
import { BsTrash } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { decrement, increment, productQtyInCartSelector } from '../../store/features/cartSlice';
import Link from 'next/link';

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

  const { status, data } = useSession() as any;

  //REDUX SECTION
  const dispatch = useAppDispatch();
  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.id)
  );
  let qtyComponent;
  let qtyWithAmountComponent;

  if(status === 'unauthenticated'){
    qtyComponent =
      <Link className={styles.qtyAddToCartLink} href={'/users/login'}>Add to cart</Link>
  }
  if(status === 'authenticated'){
    if(!qty){
      qtyComponent =
        <button className={styles.qtyAddToCart} onClick={() => dispatch(increment(props))}>Add to cart</button>
    }
    if(qty){
      qtyWithAmountComponent =
        <div className={styles.amountQty}>
          <button onClick={() => dispatch(decrement(props))}>
            {qty===1 ? (<BsTrash />) : ('-')}
          </button>
          <p>{qty}</p>
          <button onClick={() => dispatch(increment(props))}>+</button>
        </div>
    }
  }
  //--REDUX SECTION

  let priceWithQty;
  if(qty){
    priceWithQty = props.price*qty
  } else {
    priceWithQty = props.price
  }

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
        <section className={[styles.sectionContainer, mulish.className].join(" ")}>
          <div>
            <div className={styles.imgContainer}>
              <Image alt='imagen de producto' src={props.image} fill objectFit='contain'/>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.h1Container}>
              <h1>{props.title}</h1>
            </div>
            <p className={styles.description}>{props.description}</p>
            <div className={styles.divRatingStars}>
              <RatingStars rating={props.rating.rate} count={props.rating.count}/>
            </div>
            <div className={styles.amountContainer}>
              <p>Total price: $ <strong>{priceWithQty}</strong></p>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.buyNow}>Buy Now</button>
              {qtyComponent}
              {qtyWithAmountComponent}
            </div>
          </div>
        </section>
    </>
  )
}
