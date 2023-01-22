import React, { useRef } from 'react'
import { AiOutlineLeft , AiOutlineShopping , AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import {TiDeleteOutline } from "react-icons/ti"
import { urlFor } from '../lib/client'
import Link from 'next/Link'

const Cart = () => {
  const cartRef = useRef();
  const {totalQuantity , totalPrice , cartItems, setshowCart} = useStateContext()
  return (
    <div className="cart-wrapper">
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={()=> setshowCart(false)}>
            <AiOutlineLeft />
            <span className='cart-heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantity}) items</span>
          </button>
        {cartItems.length < 1 && 
        <div className='empty-cart'>
          <AiOutlineShopping size={150} />
          <div>Your Bag is Empty</div>
          <Link href="/">
           <button type='button' className='btn' onClick = {()=> setshowCart(false)}>Continue Shopping</button>
          </Link>
        </div>
        }

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item)=>(
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>₹{item.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart