
import React, {createContext ,  useContext , useState , useEffect } from "react"
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children})=>{
    const [qty, setqty] = useState(1)
    const [totalQuantity, settotalQuantity] = useState(0)
    const [showCart, setshowCart] = useState(false)
    const [cartItems, setCartItmes] = useState([])
    const [totalPrice , settotalPrice] = useState(0)
    const IncQty = ()=>{
        setqty((prevQty)=>prevQty+1)
    }
    const decQty = ()=>{
        setqty((prevQty)=>{
            if(prevQty-1 < 0) return 1;
            return prevQty - 1
        })
    }

    const onAdd= (product , quantity)=> {
        const checkProductinCart = cartItems.find(item => item._id === product._id)
        settotalPrice(prevTotalPrice => prevTotalPrice+ quantity * product.price)
        settotalQuantity(prevQty => prevQty +  quantity)
        if(checkProductinCart){
            const updatedCartProducts = cartItems.map(cartItem => {
                if(cartItem._id === product._id){
                    return {...cartItem, quantity : cartItem.quantity + quantity}
                }else{
                    return cartItem
                }
            })
            console.log(updatedCartProducts)
            setCartItmes(updatedCartProducts)
        }else{
            product.quantity = quantity
            setCartItmes([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} is succesfully added to the cart`)
    }

    return (
        <Context.Provider value={
            {qty,totalQuantity,showCart,cartItems,totalPrice,decQty,IncQty,onAdd}
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=> useContext(Context)
