import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
  
    const initialValues = {
      email : "",
      }
      const onSubmit =  ()=>{
        setErrorMsg("");
        setIsLoading(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
        .then((res)=>{
          navigate("/VerifyResetCode")
        })
        .catch((err)=>{
          setErrorMsg(err.response.data.message)
        })
        .finally(()=>{
          setIsLoading(false)
        })
        }
  
        const validationSchema = Yup.object({
            email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
        })
  
      const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      })
  
  return (
    <div className=' my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' grid grid-cols-2 gap-4 w-8/12 m-auto'>
      <Input className='col-span-2' isInvalid = {touched.email && errors.email } errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' label="email" type='email'/>
        <Button isLoading = {isLoading} type='submit'className=' col-span-2 px-4 py-2 text-sm font-semibold text-white btn-gradient'>
        Verify
        </Button> 
        { ErrorMsg && <p className=' text-red-700'>{ErrorMsg}</p>}
      </div>
      </form>
    </div> 
  )
}
