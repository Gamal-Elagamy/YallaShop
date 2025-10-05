import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import {HeroUIProvider} from '@heroui/react'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound/NotFound'
import AuthContextProvider from './Context/AuthContext'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home2 from './Pages/Home2/Home2'
import { DarkModeProvider } from './Context/DarkModeContext'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import CheckOutOnline from './Pages/CheckOutOnline/CheckOutOnline'
import CheckOutInCash from './Pages/CheckOutInCash/CheckOutInCash'
import Orders from './Pages/Orders/Orders'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import VerifyResetCode from './Pages/VerifyResetCode/VerifyResetCode'
import WishList from './Pages/WhishList/WhishList'

 const queryClient = new QueryClient()


function App() {

 const router = createBrowserRouter([
    {
      path : '', element : <Layout/>, children : [
        { index: true , element : <Home/> },
        {path: 'Home2', element: <Home2/>},
        {path: '/ProductDetails/:id/:category', element: <ProductDetails/>},
        {path: 'register', element:<ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
        {path: 'login', element: <ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
        {path: 'Brands', element:<ProtectedRoute><Brands/></ProtectedRoute> },
        {path: 'CheckOutOnline/:cartId', element: <ProtectedRoute><CheckOutOnline/></ProtectedRoute>},
        {path: 'CheckOutInCash/:cartId', element: <ProtectedRoute><CheckOutInCash/></ProtectedRoute>},
        {path: 'allorders', element: <ProtectedRoute><Orders/></ProtectedRoute>},
        {path: 'Categories', element:<ProtectedRoute><Categories/></ProtectedRoute> },
        {path: 'WishList', element:<ProtectedRoute><WishList/></ProtectedRoute> },
        {path: 'Cart', element:<ProtectedRoute><Cart/></ProtectedRoute> },
        {path:"ForgotPassword", element: <ForgotPassword/>},
        {path:"VerifyResetCode", element: <VerifyResetCode/>},
        {path:"ResetPassword", element: <ResetPassword/>},
        {path: "*", element:<NotFound/>}
      ]
    }
  ])

  return (
    <>
        <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <HeroUIProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools/>
          <ToastContainer/>
      </HeroUIProvider>  
      </AuthContextProvider>
    </QueryClientProvider>
    </DarkModeProvider>
    </>
  )
}

export default App
