import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '../../interfaces';
import styles from '@/styles/cartItem.module.css';

interface Props {
    cartItem: CartItem
}

export default function CartItemComponent({cartItem}: Props) {

  cartItem.product.title = cartItem.product.title.substring(0,18)+'...';

  return (
    <li className={styles.li}>
      <Link href={`/products/${cartItem.product.id}`}><Image className={styles.liCartImage} alt='product img' src={cartItem.product.image} width={1000} height={1000}/></Link>
      <div className={styles.titleQty}>
        <Link href={`/products/${cartItem.product.id}`}><p>{cartItem.product.title}</p></Link>
        <p><strong>Quantity: {cartItem.qty}</strong></p>
      </div>
      <p><strong>&#36; {cartItem.product.price * cartItem.qty}</strong></p>
    </li>
  )

}
