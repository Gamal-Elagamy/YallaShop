import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import NotFound from '../../Pages/NotFound/NotFound';
import Loading from '../../Component/Loading/Loading'

export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 6 } },
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 640, settings: { slidesToShow: 2} },
          ],
      };
      
    const [categorits, setCategorits] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    async function getCategorits() {
        try {
          setIsLoading(true)
          const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
          setCategorits(data.data)
        } catch (error) {
          setHasError(true)
        } finally {
          setIsLoading(false)
        }
      }
      
    useEffect(() => {
      getCategorits();
    }, [])
        
    if (isLoading) {
      return <Loading />
    }
        
    if (hasError) {
      return <NotFound />
    }
        
  return (
    <div >
      <Slider {...settings}>
        {
          categorits?.map((categorty, index) => (
            <div className='border mb-3 border-green-300 dark:border-gray-700 rounded-2xl' key={index}>
              <img className='w-full categoryImg p-2 rounded-2xl' src={categorty.image} alt={categorty.name} />
              <h3 className='text-1xl font-bold main-text-color'>{categorty.name}</h3>
            </div> 
          ))
        }
      </Slider>
    </div>
  )
}
