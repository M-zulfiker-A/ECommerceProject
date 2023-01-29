import React , {useState, useEffect}from 'react'
import {BsBagCheckFill} from 'react-icons/bs'
import {Link} from 'next/link'
import {useRouter} from 'next/router'
import { useStateContext } from '../context/StateContext'
import { runFire } from '../lib/utils'

const Success = () => {
    const {setCartItems , setTotalQuantity,settotalPrice} = useStateContext()
    const [order , setOrder] = useState(null)
    useEffect(() => {
      localStorage.clear()
      setCartItems([])
      setTotalQuantity(0)
      settotalPrice(0)
      runFire()
    }, [])
    
  return (
    <div className='succes-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order</h2>
            <p className='email-msg'>Check your mail box for reciept</p>
            <p className='description'>Fpr ANy queries please reach out to US
                <a className='email' href='mailto:muhammedzulfikererm+ecommerceapp@gmail.com'>zstoreofficial@gmail.com</a>
            </p>
            <Link href="/">
                <button type='button' className='btn' width='300px'>
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success