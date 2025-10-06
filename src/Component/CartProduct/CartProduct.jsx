import { Button } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import {UpdateProductCount, removeCartProduct } from '../../Services/CartServices'

export default function CartProduct({product, setCartId, setCartData, setnumOfCartItems}) {
    const [isLoading, setisLoading] = useState(false)
    const [incrementLoading, setIncrementLoading] = useState(false)
    const [decrementLoading, setDecrementLoading] = useState(false)
    const [productCount, setproductCount] = useState(product?.count || 1)  

    useEffect(() => {
      setproductCount(product?.count || 1)
    }, [product?.count])
  
    if (!product || !product.product) return null 
  

  return (
  <>
    <div className='relative flex p-1 mb-6 flex-col overflow-hidden rounded-xl border border-green-300 bg-gradient-to-b from-white to-gray-50 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700'>
         <Button 
        isLoading={isLoading} 
        variant='flat' 
        className='absolute top-0 right-0 min-w-0 px-2 mt-1 mr-1  bg-transparent' 
        onPress={()=> removeCartProduct(product.product._id, setCartId, setCartData, setnumOfCartItems, setisLoading)}
        endContent={
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 duration-150 hover:text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        }
        ></Button>
        <div  className="justify-between items-center  rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 shadow-md sm:flex sm:justify-start">
          <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold main-text-color">{product.product.title}</h2>
            
              <div className="flex justify-evenly items-center space-x-2 ms-1">
          <div>
          <p className="text-sm font-bold main-text-color">Price</p>
              <p className="mt-1 text-xs main-text-color">${product.price}</p>
          </div>
          <div>
          <p className="text-sm font-bold main-text-color">Total</p>
            <p className="text-sm main-text-color">{product.price * product.count}</p>
          </div>
              </div>
              <h2 className="text-md main-text-color mt-2"> <span className='font-bold'>Category</span>:{product.product.category.name}</h2>
              <h2 className="text-md main-text-color mt-2"> <span className='font-bold'>Brand</span>:{product.product.brand.name}</h2>
            </div>
            <div className="mt-4 flex items-center  justify-center sm:space-y-6 sm:mt-0 sm:block">
              <div className="flex items-center border-gray-100">
                <Button
                isLoading={decrementLoading} 
                isDisabled={product?.count === 1}
                onPress={() => 
                  UpdateProductCount(
                    product?.product?._id, 
                    product?.count - 1, 
                    product?.count, 
                    setCartData,       
                    setnumOfCartItems,   
                    setIncrementLoading, 
                    setDecrementLoading
                  )
                }
                className=" h-9 rounded-r min-w-16 text-white btn-gradient ">
                  -
                </Button>
                <input 
                      value={productCount}
                      min={1} 
                      onBlur={(e) => 
                        Number(e.target.value) !== product?.count &&
                        UpdateProductCount(
                          product?.product?._id, 
                          Number(e.target.value), 
                          product?.count, 
                          setCartData,        
                          setnumOfCartItems,   
                          setIncrementLoading, 
                          setDecrementLoading
                        )
                      } 
                      onChange={(e) => setproductCount(e.target.value)} 
                className=" h-9 w-8 main-text-color text-center text-xs outline-none" 
                type="number"  Value={product.count}  />
                <Button
                    isLoading={incrementLoading} 
                    onPress={() => 
                      UpdateProductCount(
                        product?.product?._id, 
                        product?.count + 1, 
                        product?.count, 
                        setCartData,        
                        setnumOfCartItems,   
                        setIncrementLoading, 
                        setDecrementLoading
                      )
                    }
                className=" h-9 rounded-l min-w-16 text-white btn-gradient "> 
                + </Button>
              </div>
              
              <div className="flex items-center mt-3 mr-5">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <svg 
                        key={rate} 
                        aria-hidden="true" 
                        className={` ml-1 h-5 w-4 ${rate <= product.product.ratingsAverage ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-300 text-white dark:text-gray-800">
                      {product.product.ratingsAverage}
                    </span>
                  </div>
            </div>
          </div>
        </div>
    </div>
  </>
  )
}
