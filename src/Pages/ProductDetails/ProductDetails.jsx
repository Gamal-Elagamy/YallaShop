import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../Component/Loading/Loading'
import Slider from "react-slick";
import NotFound from '../NotFound/NotFound';
import { Button } from '@heroui/react';
import { addProductToCart } from '../../Services/CartServices';
import {
  addProductWishList,
  clearWishList,
  getWishlist,
} from "../../Services/WishListSevices";

export default function ProductDetails() {
   const {id, category} = useParams()
   const [ProductDetails, setProductDetails] = useState(null)
   const [relatedProducts, setRelatedProducts] = useState([])
   const [isLoading, setisLoading] = useState(true)
   const [hasError, setHasError] = useState(false)
   const [addToCartLoading, setAddToCartLoading] = useState(false);
   const [wishListLoading, setWishListLoading] = useState(false);
   const [addedToWishlist, setAddedToWishlist] = useState(false);
 
useEffect(() => {
  async function checkWishlist() {
    const data = await getWishlist();
    setAddedToWishlist(data.some((item) => item.id === ProductDetails?.id));
  }
  if (ProductDetails) checkWishlist();
}, [ProductDetails?.id]);

const handleWishlist = async () => {
  setWishListLoading(true);
  try {
    if (addedToWishlist) {
      await clearWishList(ProductDetails?.id);
      setAddedToWishlist(false);
    } else {
      await addProductWishList(ProductDetails?.id);
      setAddedToWishlist(true);
    }
  } finally {
    setWishListLoading(false);
  }
};


    useEffect(()=>{
        getProductDetails(id)
        getRelatedProduct(category)
    }, [id])

   async function getProductDetails(){
    try{
      setisLoading(true)
      const {data} = await axios("https://ecommerce.routemisr.com/api/v1/products/" + id)
      setProductDetails(data.data);
    } catch (error) {
      setHasError(true)
    } finally {
      setisLoading(false)
    }
     }

     async function getRelatedProduct(category){
      try{
        setisLoading(true)
        const {data} = await axios("https://ecommerce.routemisr.com/api/v1/products")
        let allProduct = data.data
        let Related = allProduct.filter(product => product.category.name == category)
        setRelatedProducts(Related);
      } catch (error) {
        setHasError(true)
      } finally {
        setisLoading(false)
      }
       }

   var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 2} },
      { breakpoint: 640, settings: { slidesToShow: 1} },
    ],

  };
  if(isLoading){
    return <Loading/>
  }
  if (hasError) {
    return <NotFound />
  }


  return (
    <div className="flex items-center rounded px-3 flex-wrap border border-green-300  dark:border-gray-700 border-rounded-2xl bg-white shadow-lg  dark:bg-gray-800">
      <div className="w-full py-4  lg:w-1/3 px-4 mb-8">
        <Slider {...settings}>
          {
            ProductDetails?.images.map((img, index) => {
              return <img key={index} src={img} alt={ProductDetails?.title} className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
            })
          }
        </Slider>
      </div>

      <div className="w-full lg:w-2/3 px-4">
        <h2 className="mb-2 text-3xl font-bold tracking-tight main-text-color">{ProductDetails?.title}</h2>
        <div className="mt-2 mb-5 flex flex-col items-center justify-between flex-grow">
            {ProductDetails?.priceAfterDiscount ? (
              <div className="text-center">
                <p className="text-2xl font-bold  text-gray-900 dark:text-white">${ProductDetails?.priceAfterDiscount}</p>
                <p className="text-sm text-gray-500 line-through dark:text-gray-400">${ProductDetails?.price}</p>
                <p className="text-xs mt-1 font-medium main-text-color">
                  ⏳ Limited-time offer!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${ProductDetails?.price}</p>
                <p className="text-xs mt-1 font-medium main-text-colorr">
                  🚀 Exciting offers coming soon!
                </p>
              </div>
            )}
      
            <div className="flex items-center mt-3">
              {[1, 2, 3, 4, 5].map((rate) => (
                <svg 
                  key={rate} 
                  aria-hidden="true" 
                  className={`h-5 w-5 ${rate <= ProductDetails?.ratingsAverage ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-300 text-white dark:text-gray-800">
                {ProductDetails?.ratingsAverage}
              </span>
            </div>
          </div>

        <p className=" text-3xl main-text-color mb-6">{ProductDetails?.description}</p>
        <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
  <Button
    isLoading={addToCartLoading}
    onPress={() => addProductToCart(ProductDetails?.id, setAddToCartLoading)}
    className="btn w-full sm:w-[50%] rounded-lg px-4 py-2 text-sm font-semibold text-white btn-gradient"
  >
    🛒 Add To Cart
  </Button>

  <Button
      isLoading={wishListLoading}
      onPress={handleWishlist}

    className={`btn1 w-full sm:w-[50%] btn2 rounded-lg px-4 py-2 text-sm font-semibold text-white${
      addedToWishlist ? "bg-red-600" : ""
    }`}
  >
    {addedToWishlist ? "❤️ Remove from Wishlist" : "💖 Add to Wishlist"}
  </Button>
</div>


      </div>

      <div className="w-11/12 mx-auto mt-10 ">
  <h3 className="text-3xl font-bold mb-6 main-text-color">Related Products</h3>
  <Slider {...settings2}>
    {relatedProducts.map((product, index) => (
      <div key={index} className="p-2">
        <div className="relative h-full flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
          
          <Link to={`/ProductDetails/${product._id}/${product.category.name}`} className="block relative h-48">
            <img 
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 rounded-t-lg" 
              src={product.imageCover} 
              alt={product.title} 
            />
            {product.priceAfterDiscount && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {(100 - (product.priceAfterDiscount * 100) / product.price).toFixed(0)}% OFF
              </span>
            )}
          </Link>

          <div className="flex flex-col flex-grow p-3">
            <h5 className="mb-2 text-lg font-semibold main-text-color line-clamp-1">{product.title}</h5>

            <div className="mt-2 mb-5 flex flex-col items-center justify-between flex-grow">
            {product.priceAfterDiscount ? (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${product.priceAfterDiscount}</p>
                <p className="text-sm text-gray-500 line-through dark:text-gray-400">${product.price}</p>
                <p className="text-xs mt-1 font-medium main-text-color">
                  ⏳ Limited-time offer!
                </p>
              </div>
            ) : (
              <div className="text-center">
               <p className="text-2xl font-bold text-gray-900 dark:text-white">${ProductDetails?.price}</p>
                <p className="text-xs mt-1 font-medium main-text-colorr">
                  🚀 Exciting offers coming soon!
                </p>
              </div>
            )}
      
            <div className="flex items-center mt-3">
              {[1, 2, 3, 4, 5].map((rate) => (
                <svg 
                  key={rate} 
                  aria-hidden="true" 
                  className={`h-5 w-5 ${rate <= product.ratingsAverage ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-300 text-white dark:text-gray-800">
                {product.ratingsAverage}
              </span>
            </div>
          </div>       
     
          </div>
        </div>
      </div>
    ))}
  </Slider>
    </div>
   </div>
  )
}
