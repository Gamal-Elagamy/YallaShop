import React, { useContext } from 'react'
import { authcontext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {
    const {IsLoggedIn} =  useContext(authcontext)

  return (
    <>
   {
    IsLoggedIn ?  <Navigate to={'/'}/>  : children
   }
    </>
  )
}
