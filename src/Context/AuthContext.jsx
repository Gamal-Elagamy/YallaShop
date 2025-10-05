import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
export const authcontext =  createContext();

export default function AuthContextProvider({ children }){
   
    const [IsLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    verifyUserToken()
  }, [])

  function verifyUserToken(){
    axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {headers:{token:localStorage.getItem("token")}})
      .then((res)=>{setIsLoggedIn(true)})
      .catch((err)=>{
        localStorage.removeItem("token"),
        setIsLoggedIn(false),
        <Navigate to={"/login"}/>
      })
    }
    return <authcontext.Provider value={{IsLoggedIn, setIsLoggedIn}}> 
          {children}
        </authcontext.Provider> 

  }