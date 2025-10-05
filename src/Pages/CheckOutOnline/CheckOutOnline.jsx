import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"

export default function CheckOutOnline() {
  
  const [isLoading, setIsLoading] = useState(false);
  const {cartId}= useParams();

  const initialValues = {
    details: "",
    phone: "",
    city: ""
    }

    async function chekOut(){
      setIsLoading(true)
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {shippingAddress:values},
      { headers:{token:localStorage.getItem("token")},
      params:{url:"https://yalla-shop.vercel.app/allorders"} } 
      )
      setIsLoading(false)
      location.href= data.session.url
    }

    const validationSchema = Yup.object({
        details: Yup.string().required("details Is Rquired"),
        phone: Yup.string().required("phone Is Rquired").matches(/^01[0125][0-9]{8}$/, "accept only egyptian phone numbers"),  
        city: Yup.string().required("city Is Rquired"),
    })

        const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
      initialValues,
      onSubmit :chekOut,
      validationSchema
    })

  return (
    <>
    <h1>Address</h1>
    <div className=' my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' w-11/12  sm:w-2/3 mx-auto grid py-15 gap-4'>
       <Input  isInvalid = {touched.details && errors.details } errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' variant='bordered' label="Details" type='text'/>
       <Input  isInvalid = {touched.phone && errors.phone } errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' label="Phone" type='tel'/>
       <Input  isInvalid = {touched.city && errors.city } errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant='bordered' label="City" type='text'/>
       <Button className=' px-4 py-2 text-sm font-semibold text-white btn-gradient' type='submit' isLoading={isLoading}> Place Order</Button>
      </div>
      </form>
    </div> 
    </>
  )
}
