import axios from 'axios'
import { useEffect, useState } from 'react'
import { formatDate } from '../../Services/Helpers/Date'
import Loading from '../../Component/Loading/Loading'
import NotFound from '../NotFound/NotFound'

export default function Orders() {
  const [orders, setorders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)


  useEffect(() => {
    getUserId()
  }, [])



  async function getUserId() {
    try {
      setIsLoading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      {
        headers: { token: localStorage.getItem("token") }
      }
    )
    grtUserOrder(data.decoded.id)
  } catch (error) {
    setHasError(true)
  } finally {
    setIsLoading(false)

    }
  }

  async function grtUserOrder(userId) {
    try {
    setIsLoading(true)
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    setorders(data)
    } catch (error) {
      setHasError(true)
    }
    finally {
    setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (hasError) {
    return <NotFound />
  }
  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Orders <span className='text-red-500 dark:text-red-400'>({orders?.length})</span>
        </h1>
      </div>
      <div className="grid gap-3">
        {
          !isLoading && orders?.length > 0 ? 
          (
            orders?.map((order, index) => {
              return (
                <div key={index} className="pb-14  px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                  <div className="flex justify-start item-start space-y-2 flex-col ">
                  <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white">
                    Order Number <span className='text-red-500 dark:text-red-400'>({index + 1})</span> 
                  </h1>
                    <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">{formatDate(order?.createdAt)}</p>
                  </div>
                  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 border rounded-lg border-green-300 dark:border-gray-700 md:space-y-6 xl:space-y-8">
                      <div className="flex flex-col justify-start items-start bg-gray-50 dark:bg-gray-800 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 dark:text-white">Customer’s Cart</p>
                        {order?.cartItems.map((cartItem, index) => {
                          return (
                            <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full hover:scale-x-105 hover:scale-y-105 transition-all rounded-lg">
                              <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full rounded-lg" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                              </div>
                              <div className="border-b border-green-300 dark:border-gray-700 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0 rounded-lg">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{cartItem.product.title}</h3>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                  <div>
                                    <p className="text-base font-bold xl:text-lg leading-6 text-gray-800 dark:text-gray-300">Count</p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800 dark:text-gray-300">{cartItem.count}</p>
                                  </div>
                                  <div>
                                    <p className="text-base font-bold xl:text-lg leading-6 text-gray-800 dark:text-gray-300">Price</p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800 dark:text-gray-300">$ {cartItem.price}</p>
                                  </div>
                                  <div>
                                    <p className="text-base font-bold xl:text-lg leading-6 text-gray-800 dark:text-gray-300">Total</p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800 dark:text-gray-300">$ {cartItem.price * cartItem.count}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 rounded-lg">
                          <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">Summary</h3>
                          <div className="flex justify-center items-center w-full space-y-4 flex-col border-green-300 dark:border-gray-700 border-b pb-4">
                            <div className="flex justify-between w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">Subtotal</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">${order.totalOrderPrice}</p>
                            </div>

                            <div className="flex justify-between w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">payment</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">{order.paymentMethodType}</p>
                            </div>

                            <div className="flex justify-between w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">Is Paid</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">{order.isPaid + ""}</p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">Shipping</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">${order.shippingPrice}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-base font-semibold leading-4 text-gray-800 dark:text-white">Total</p>
                            <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-300">${order.totalOrderPrice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-green-300 dark:border-gray-700 shadow-lg  dark:bg-gray-800 w-full xl:w-96 flex flex-col justify-center items-center px-4 py-6 md:p-6 xl:p-8 rounded-lg sticky top-20 self-start">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white mb-6">Customer</h3>
                            
                            <div className="flex flex-col justify-center items-center h-full w-full space-y-6">
                              
                              <div className="flex flex-col justify-center items-center space-y-2 border-b border-green-300 dark:border-gray-700 w-full pb-4">
                                <p className="text-base font-bold text-gray-800 dark:text-white">Name</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-400">{order.user.name}</p>
                              </div>
                              
                              <div className="flex flex-col justify-center items-center space-y-2 border-b border-green-300 dark:border-gray-700 w-full pb-4">
                                <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-2 rounded-full">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">       
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" 
                                      stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <p className="text-base font-semibold text-gray-800 dark:text-white">Email</p>
                                <p className="text-sm text-gray-800 dark:text-gray-400">{order.user.email}</p>
                              </div>
                              
                              <div className="flex flex-col justify-center items-center space-y-2">
                                <p className="text-base font-semibold text-gray-800 dark:text-white">Phone Number</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{order.user.phone}</p>
                              </div>
                              
                            </div>
                          </div>
                    
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center text-xl font-semibold text-gray-800 dark:text-white">
              You haven't requested any orders yet 😔
            </div>
          )
        }
      </div>
    </>
  )
}
