
import React, {createContext ,  useContext , useState} from "react"
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children})=>{
    const [qty, setqty] = useState(1)
    const [totalQuantity, settotalQuantity] = useState(0)
    const [showCart, setshowCart] = useState(false)
    const [cartItems, setCartItmes] = useState([])
    const [totalPrice , settotalPrice] = useState(0)
    let foundProduct
    let foundIndex
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

    const toggleCartItemQuantity = (id, value)=>{
        foundProduct = cartItems.find(item => item._id === id )
        foundIndex = cartItems.findIndex(item=>item._id===id)
        console.log(foundIndex, foundProduct)
        if(value === "dec"){
            if(foundProduct.quantity > 1){
                let updatedCartProducts = cartItems.map(cartItem=>{
                    if(id === cartItem._id){
                        return {...cartItem,quantity:cartItem.quantity-1}
                    }else{
                        return cartItem
                    }
                })
                setCartItmes(updatedCartProducts)
                settotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                settotalQuantity(prevQty=> prevQty-1)
            }else{
                let updatedProducts = cartItems.filter((item)=>item._id!==foundProduct._id)
                setCartItmes(updatedProducts)
                settotalPrice(prevPrice => prevPrice - foundProduct.price)
            }
        }else if(value ==="inc"){
            let updatedCartProducts = cartItems.map(cartItem=>{
                if(id === cartItem._id){
                    return {...cartItem,quantity:cartItem.quantity+1}
                }else{
                    return cartItem
                }
            })
            setCartItmes(updatedCartProducts)
            settotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            settotalQuantity(prevQty=> prevQty+1)
        }
    }

    return (
        <Context.Provider value={
            {qty,totalQuantity,showCart,cartItems,totalPrice,decQty,IncQty,onAdd,setshowCart,toggleCartItemQuantity}
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=> useContext(Context)
