import React from 'react';
import styles from '@/styles/productDetail.module.css';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Image from 'next/image';
import Banner from '@/Components/Banner';
import {Mulish} from 'next/font/google';
import RatingStars from '@/Components/RatingStars';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { isTemplateTail } from 'typescript';

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

  const [stock, setStock] = React.useState<number>(1);
  const [productAmount, setProductAmount] = React.useState<number>(1);

  let stockHtml;
  if (stock <= 5){
    stockHtml =  <p>Only <strong>{stock}</strong> items left! Don&#39;t miss it!</p>
  } else {
    stockHtml =  <p><strong>{stock}</strong> items in stock! Don&#39;t miss it!</p>
  }

  function amountIncrement(): void {
    if(productAmount < stock){
      setProductAmount(productAmount + 1)
    }
  }
  function amountDecrement(): void {
    if(productAmount > 1){
      setProductAmount(productAmount - 1)
    }
  }

  function getRandomInt(max: number){
    let num = Math.floor(Math.random() * max);
    num === 0 ? num = 1 : null;
    return num
  }
  React.useEffect(() => {
    setStock(getRandomInt(20))
  }, [])

  function handleCart (): void {
    if (status === 'authenticated'){

      let userId = data.user?.userId as number;
      let oldCart = JSON.parse(localStorage.getItem(`${userId}_cart`)!);

      if (oldCart === null){

        let arr = [];
        arr.push(`${productAmount}_${props.id}`)
        localStorage.setItem(`${userId}_cart`, JSON.stringify(arr));

      } else {

        const same = (item:string) => item === props.id.toString();

        let idArr: Array<string> = [];
        oldCart.forEach((i:string) => {
          let stringArr: Array<string> = i.split('_');
          idArr.push(stringArr[1])
        })

        if (idArr.some(same)){
          alert('Ya agregaste este producto a tu carrito')
        } else {
          oldCart.push(`${productAmount}_${props.id}`)
          localStorage.setItem(`${userId}_cart`, JSON.stringify(oldCart));
        }

      }

    } else if (status === 'unauthenticated') {
      Router.replace('/users/login')
    }
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
        <section className={mulish.className}>
          <div className={styles.h1Container}>
            <h1>{props.title}</h1>
          </div>
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
                <button onClick={() => amountDecrement()}>-</button>
                <p>{productAmount}</p>
                <button onClick={() => amountIncrement()}>+</button>
              </div>
              <p>Total price: $ <strong>{props.price*productAmount}</strong></p>
            </div>
            {stockHtml}
            <div className={styles.actionButtons}>
              <button>Buy Now</button>
              <button onClick={handleCart}>Add To Cart</button>
            </div>
          </div>
        </section>
    </>
  )
}
