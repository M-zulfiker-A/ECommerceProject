import React, { useState } from 'react'
import {client , urlFor} from '../../lib/client'
import Product from "../../components/Product"
import {AiOutlineMinus , AiFillStar , AiOutlineStar, AiOutlinePlus} from 'react-icons/ai'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({products , product}) => {
    const {image , name , description, price } = product
    const [index, setIndex] = useState(0)
    const {qty, IncQty , decQty, onAdd ,setshowCart} = useStateContext()
    const handleBuyNow = ()=>{
        onAdd(product,qty)
        setshowCart(true)
    }
   return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src ={urlFor(image && image[index])}
                    className='product-detail-image' />
                </div>
                <div className ="small-images-container">
                    {image?.map((item, i)=>{
                        return <img
                                    src={urlFor(item)}
                                    key={i}
                                    className={i=== index ? 'small-image selected-image' :  'small-image'}
                                    onMouseEnter={()=>setIndex(i)}
                                />
                    })}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
                <p>
                    (20)
                </p>
                <h4>Details: </h4>
                <p>{description}</p>
                <p className='price'>₹{price}</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>
                            {qty}
                        </span>
                        <span className='plus' onClick={IncQty}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type="button" className='add-to-cart' onClick={()=>onAdd(product,qty)}>Add to Cart</button>
                    <button type="button" className='buy-now' onClick={()=>handleBuyNow()}>Buy Now</button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item)=>{
                        return <Product 
                            key={item._id}
                            product = {item} 
                        />
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticProps = async({params : { slug }})=>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productQuery = `*[_type == "product"]`
    const product = await client.fetch(query)
    const products =  await client.fetch(productQuery)
    return {
      props : { products , product}
    }
}

export const getStaticPaths = async()=>{
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`;
    const products = await client.fetch(query)
    const  paths = products.map(product => ({
        params :{
            slug : product.slug.current
        },
    }))
    return {
        paths,
        fallback : 'blocking'
    }
}

export default ProductDetails