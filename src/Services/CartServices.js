import axios from "axios";
import showToast from "../Component/Toasts/Toasts";

  export  async function addProductToCart(productId, setAddToCartLoading) {
    try {
      setAddToCartLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {headers:
           {token: localStorage.getItem("token")}})
      showToast("success", data.message);
    } catch (error) {
      const msg = error.response?.data?.message;
      showToast("error", msg);
    } finally {
      setAddToCartLoading(false);
    }
  }

 export async function getCart(setIsLoading, setCartId, setCartData, setnumOfCartItems, setHasError) {
    try{
      setIsLoading(true)    
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
      {headers:
          {token: localStorage.getItem("token")}})
      setCartId(data.cartId)
      setCartData(data.data)
      setnumOfCartItems(data.numOfCartItems)
    } catch(error){
      setHasError(true)
    } finally{
      setIsLoading(false)
    }
  }

  export async function removeCartProduct(cartItemId, setCartId, setCartData, setnumOfCartItems, setisLoading) {
    try {
      setisLoading(true);
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {headers:
           {token: localStorage.getItem("token")}})
           setCartId(data.cartId)
           setCartData(data.data)
           setnumOfCartItems(data.numOfCartItems)
    } catch (error) {
      const msg = error.statusMsg?.message;
      showToast("error", msg);
    } finally {
      setisLoading(false);
    }
  }

  export async function clearCart(setisLoading, setCartId, setCartData, setnumOfCartItems) {
    try {
      setisLoading(true);
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers:
           {token: localStorage.getItem("token")}})
           console.log(data)
           setCartId(null)
           setCartData(null)
           setnumOfCartItems(0)
    } catch (error) {
      const msg = error.statusMsg?.message;
      showToast("error", msg);
    } finally {
      setisLoading(false);
    }
  }

  export async function UpdateProductCount (productId, count, currentCount, setCartData, setnumOfCartItems, setIncrementLoading, setDecrementLoading){
    if(currentCount < count){
      setIncrementLoading(true)
    };
    if(currentCount > count){
      setDecrementLoading(true)
    };
    const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {count},
    {headers:{token:localStorage.getItem("token")}})
    setIncrementLoading(false)
    setDecrementLoading(false)
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems)
    }