import React, { useState, useEffect } from 'react'
import { Search } from '@mui/icons-material'
import ProductsAPI from '../../api/ProductsAPI' // Import ProductsAPI for search
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedDescription, setExpandedDescription] = useState(null) // Track which description is expanded
  const navigate = useNavigate()

  // Debounced search function
  const debouncedSearch = term => {
    setSearchTerm(term) // Update the search term with the user's input
  }

  // Debounce logic to delay search execution
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchProducts()
      }
    }, 500) // 500ms delay to debounce

    return () => clearTimeout(timer) // Clean up the timer on component unmount or when searchTerm changes
  }, [searchTerm])

  // Perform the search API call
  const searchProducts = async () => {
    if (!searchTerm) return

    try {
      setLoading(true)
      const response = await ProductsAPI.searchProducts(searchTerm) // Call the search API with the search term

      if (response.success) {
        setSearchResults(response.data) // Assuming `response.data` contains the search results
        setError('') // Clear previous errors
      } else {
        setError('No products found.')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to search products.')
      setError('Failed to search products.')
    } finally {
      setLoading(false)
    }
  }

  // Handle description expand/collapse
  const toggleDescription = index => {
    setExpandedDescription(expandedDescription === index ? null : index) // Toggle description visibility
  }

  // Limit the description length to 100 characters
  const truncateDescription = description => {
    const maxLength = 100
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`
    }
    return description
  }

  const handleProdClick = _id => {
    navigate(`/product/${_id}`)
    window.location.reload()  }
  return (
    <div className='relative w-full flex flex-col justify-center gap-4'>
      <div className='flex justify-between items-center w-full border px-5 py-2 rounded-full'>
        <Search className='text-gray-500' />
        <input
          type='text'
          placeholder='Search product ...'
          value={searchTerm}
          onChange={e => debouncedSearch(e.target.value)} // Debounced search trigger
          className='w-full p-2 border-none focus:outline-none'
        />
      </div>
      <hr className='my-2 w-full' />

      {/* Loading, Error, and Search Results Display */}
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex flex-col gap-2'>
        {searchResults.length > 0 ? (
          searchResults.map((product, index) => (
            <div
              key={index}
              className='w-full border-b pb-4 flex flex-row gap-4 h-fit'
            >
              <div
                className='w-[8rem] h-[8rem] cursor-pointer'
                onClick={()=>handleProdClick(product._id)}
                >
                <img
                  src={
                    '	https://d1qnguc0fjgoar.cloudfront.net/' + product.images[0]
                  }
                  className='object-cover w-full h-full border'
                  alt={product.name}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <h2
                  className='text-lg font-bold sm:text-xl cursor-pointer'
                  onClick={()=>handleProdClick(product._id)}
                >
                  {product.name}
                </h2>
                <p className='text-gray-500 text-sm sm:text-base'>
                  <span className='font-bold'>Price:</span> {product.price}
                </p>
                <p className='text-gray-500 text-sm sm:text-base'>
                  <span className='font-bold'>Description:</span>

                  {expandedDescription === index
                    ? product.description
                    : truncateDescription(product.description)}
                  {/* Show Read more/less link */}
                  {product.description.length > 200 && (
                    <span
                      onClick={() => toggleDescription(index)}
                      className='text-blue-500 cursor-pointer'
                    >
                      {expandedDescription === index
                        ? 'Read less'
                        : 'Read more'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  )
}

export default SearchProduct
