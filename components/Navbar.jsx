import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from "./Cart"
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const {showCart, setshowCart ,totalQuantity} = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Z Headphones</Link>
      </p>
      <button type='button'
        className='cart-icon' onClick={ ()=> setshowCart(true)}>
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar