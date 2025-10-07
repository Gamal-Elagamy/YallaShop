import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import Product from '../../Component/Product/Product'
import NotFound from '../NotFound/NotFound'
import { Link } from 'react-router-dom'
import CategoriesSlider from '../../Component/CategoriesSlider/CategoriesSlider'

export default function Home2() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getAllProducts()
  }, [])

  async function getAllProducts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products?page=2')
      setProducts(data.data)
    } catch (error) {
      setHasError(true)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? product.category.name === categoryFilter : true)
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  if (isLoading) return <Loading />
  if (hasError) return <NotFound />

  const categories = [...new Set(products.map(p => p.category.name))]

  return (
    <>

      <div className="max-w-7xl mx-auto px-4">
      <CategoriesSlider />
        <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4 items-center">
          <input
            type="text"
            placeholder="Search by product name..."
            className="p-2 border border-green-400 rounded-md w-full max-w-md dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 border border-green-400 rounded-md dark:bg-gray-800 dark:text-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>

          <select
            className="p-2 border border-green-400 rounded-md dark:bg-gray-800 dark:text-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-bold text-green-600">{sortedProducts.length}</span> Products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <Product product={product} key={index} />
            ))
          ) : (
            <p className="text-center main-text-color col-span-full">
              No Products Found
            </p>
          )}
        </div>

        <div className='mt-8 flex justify-center gap-3'>
          {location.pathname !== "/" && (
            <Link to="/" className="px-4 py-2 text-sm font-semibold rounded-lg btn-gradient">Previous</Link>
          )}
          {location.pathname !== "/Home2" && (
            <Link to="/Home2" className="px-4 py-2 text-sm font-semibold rounded-lg btn-gradient">Next</Link>
          )}
        </div>
      </div>
    </>
  )
}
