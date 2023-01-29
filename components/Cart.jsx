import React, { useRef } from 'react'
import { AiOutlineLeft , AiOutlineShopping , AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { toast, Toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import {TiDeleteOutline } from "react-icons/ti"
import { urlFor } from '../lib/client'
import Link from 'next/link'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef();
  const {totalQuantity , totalPrice , cartItems, setshowCart, toggleCartItemQuantity,toggleCartRemove} = useStateContext()
  const handleCheckOut = async()=>{
    const stripe = await getStripe()
    const response = await fetch('/api/stripe',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(cartItems)
    })
    if(response.statusCode === 500) return
    const data = await response.json()
    toast.loading('Redirecting....')
    stripe.redirectToCheckout({sessionId : data.id})
  }
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
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={()=>toggleCartItemQuantity(item._id,"dec")}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>
                            {item.quantity}
                        </span>
                        <span className='plus' onClick={()=>toggleCartItemQuantity(item._id,"inc")}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                  </div>
                  <button 
                    className='remove-item'
                    type='button'
                    onClick={()=>toggleCartRemove(item._id)} >
                      <TiDeleteOutline />
                    </button>

                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >=1 && 
        ( 
        <div className='cart-bottom'>
          <div className="total">
            <h3>Subtotal</h3>
            <h3>₹{totalPrice}</h3>
          </div>
          <div className="btn-container">
            <button className='btn' type='button' onClick={()=>handleCheckOut()}>
              Pay With Stripe
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Cart