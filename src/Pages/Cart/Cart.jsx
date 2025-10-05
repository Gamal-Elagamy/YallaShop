import React, { useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import CartProduct from '../../Component/CartProduct/CartProduct'
import NotFound from '../NotFound/NotFound'
import { clearCart, getCart } from '../../Services/CartServices'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [CartId, setCartId] = useState(null)
    const [CartData, setCartData] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [clearCartisLoading, setclearCartisLoading] = useState(false)

    useEffect(() => {
      getCart(setIsLoading, setCartId, setCartData, setnumOfCartItems, setHasError)
    },[])
    
    if (isLoading) {
      return <Loading />
    }
    if (hasError) {
      return <NotFound />
    }
  return (
   <>
  <div className='flex justify-between  dark:text-white'> 
     <h1 className="mb-10 text-center text-2xl font-bold">Productes In Your Cart<span className='text-red-500'>({numOfCartItems})</span> </h1>
        {   
          !!numOfCartItems &&   
          <Button isLoading={clearCartisLoading} onPress={() => clearCart(setclearCartisLoading, setCartId, setCartData, setnumOfCartItems)} 
          className=' text-red-800 bg-transparent min-w-4 dark:text-red-400'>Clear</Button>
        }    
      </div>
    
          { 
            numOfCartItems ?
            <div className="mx-auto max-w-5xl justify-center  px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {
                CartData?.products.map((product, index) => {
                  return <CartProduct 
                  key={index} 
                  product={product} 
                  setCartId={setCartId} 
                  setCartData={setCartData} 
                  setnumOfCartItems={setnumOfCartItems} 
                  />
                  
                })
              }
           
            </div>
            <div className="mt-6 sticky top-20 h-full rounded-lg border border-green-300 bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-2 flex justify-between">
            <p className="font-bold main-text-color">Subtotal</p>
            <p className="text-gray-700 dark:text-gray-300">${CartData?.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold main-text-color ">Shipping</p>
            <p className="main-text-color ">$0</p>
          </div>
          <hr className="my-4 border-green-300 dark:border-gray-700" />
          <div className="flex justify-between">
            <p className="text-lg  font-bold main-text-color ">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold main-text-color ">${CartData?.totalCartPrice } USD</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">including VAT</p>
            </div>
          </div >
          <Link to={"/CheckOutOnline/" + CartId} className=" mt-6 rounded-md block btn px-4 py-2 text-sm font-semibold text-white btn-gradient">
            Pay Online 
          </Link>
          <Link to={"/CheckOutInCash/" + CartId} className=" mt-6 rounded-md block btn px-4 py-2 text-sm font-semibold text-white btn-gradient">
            Pay Cash
          </Link>
        </div>
           </div>
    :
            <h1 className='text-center text-xl text-gray-600 font-semibold mt-10 dark:text-gray-300'>
              No Products In Your Cart 😔
            </h1>
      }
  
   </>
  )
}
