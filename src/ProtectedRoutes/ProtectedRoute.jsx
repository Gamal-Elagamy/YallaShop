import React, { useContext } from 'react'
import { authcontext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

  //  const {IsLoggedIn} =  useContext(authcontext)
  return (
    <>
    {localStorage.getItem("token") != null ? children : <Navigate to={"/login"}/>}

    {/* //  IsLoggedIn ?  children : <Navigate to={'/login'}/> */}
    </>
  )
}
