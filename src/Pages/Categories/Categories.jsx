import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../../Component/Loading/Loading'

export default function Categories() {

  function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
 const {data, isLoading} = useQuery({

  queryKey : ["Categories"],
  queryFn : getAllCategories,
  select: (data)=> data.data.data,
  refetchOnReconnect:false,
  gcTime: 5000,

 })

    if (isLoading) {
      return <Loading />
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((category, index) => (
          <div key={index} className="bg-white border border-green-300 dark:border-gray-700 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <div className=' min-h-80'>
          <img className="w-full " src={category.image} alt={category.name}/>
          </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
