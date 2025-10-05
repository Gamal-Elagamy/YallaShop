import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <Navbar/>
      <ScrollRestoration/>
      <div className="container text-center px-3 py-5">
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
