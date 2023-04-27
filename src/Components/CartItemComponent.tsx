import React from 'react'
import { CartItem } from '../../interfaces'

interface Props {
    cartItem: CartItem
}

export default function CartItemComponent({cartItem}: Props) {

  return (
    <div>
        <p>{cartItem.product.title}</p>
        <p>{cartItem.qty}</p>
    </div>
  )

}
