import React, { useEffect, useState } from 'react'
import ProductList from '../components/Products/ProductList'
import useAxios from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { formatCurrency } from '../utils/formatCurrency'
import { useNavigate } from 'react-router-dom'

const ProductDetail = () => {
  const axios = useAxios()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [productByCategory, setProductByCategory] = useState([])
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const navigate = useNavigate()
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // Fetch reviews for the product
    axios
      .get(`${process.env.REACT_APP_API_URL}api/review/getReviews/${productId}`)
      .then(res => {
        setReviews(res.data)
      })
      .catch(err => console.log(err))
  }, [productId])

  const handleAddReview = async () => {
    if (!reviewText.trim() || (rating && (rating < 1 || rating > 5))) {
      toast.error('Please provide a valid review and rating.')
      return
    }

    console.log("ProdID: ", productId)
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/review/${productId}`,
        { reviewText, rating }
      )
      setReviews([...reviews, response.data]) // Update the reviews list
      setReviewText('') // Clear the form
      setRating(null)
      toast.success('Review added successfully!')
    } catch (error) {
      console.error('Error adding review:', error)
      toast.error(error.response?.data?.message || 'Failed to add review')
    }
  }
  // for review

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/product/${productId}`)
      .then(res => {
        const product = res.data.data.product
        setProduct(product)
        setPreviewImage(product.images[0])
      })
      .catch(err => console.log(err))
  }, [productId])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/product/category/${product?.category}`
      )
      .then(res => {
        // exclude the current product
        const products = res.data.data.filter(
          product => product._id !== productId
        )
        setProductByCategory(products)
      })
      .catch(err => console.log(err))
  }, [product?.category])

  const handleAddToCart = async (id, isBuyNow = false) => {
    if (!selectedVariant) {
      toast.error('Please select a variant')
      return
    }

    try {
      console.log('Selected Variant:', selectedVariant)
      console.log('Quantity:', quantity)

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/cart/add-to-cart`,
        {
          productId: id,
          quantity,
          variant: selectedVariant
        }
      )

      toast.success('Product added to cart')
      console.log('Updated Cart:', response.data.cart)

      if (isBuyNow) {
        navigate('/cart')
      } else {
        // Optionally refresh cart dynamically if you have state management
        // setCart(response.data.cart); // Example using React state
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding product to cart:', error)

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message) // Display error from backend
      } else {
        toast.error('Error adding product to cart')
      }
    }
  }

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  if (error) {
    return <div>Error: {error}</div> // Show error message
  }

  if (!product) {
    return <div>Product not found</div> // Handle case where product is not found
  }
  // Set initial preview image to the first image of the product

  const handleThumbnailClick = image => {
    setPreviewImage(image) // Update the preview image when a thumbnail is clicked
  }

  return (
    <div className='md:p-20 p-4'>
      <nav className='text-sm text-gray-500 mb-4'>
        <a href={`/category/${product?.category}`} className='hover:underline'>
          {product?.category}
        </a>{' '}
        /
        <a href={`/product/${product?._id}`} className='hover:underline'>
          {' '}
          {product?.name}
        </a>
      </nav>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2'>
          <div className='relative w-full h-[40rem] border'>
            {' '}
            {/* Set a fixed height for the preview image */}
            <img
              src={previewImage}
              alt={product?.name}
              className='w-full h-full object-cover' 
            />
          </div>
          <div className='flex mt-2 space-x-2'>
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className='w-20 h-20 border cursor-pointer object-cover'
                onClick={() => handleThumbnailClick(image)} // Set preview image on click
              />
            ))}
          </div>
        </div>

        <div className='md:w-1/2 md:pl-8'>
          <h1 className='text-xl font-bold'>{product?.name}</h1>
          <div className='flex items-center mt-2'>
            <span className='text-yellow-500'>
              <i className='fas fa-star'></i>
            </span>
            <span className='text-yellow-500'>
              <i className='fas fa-star'></i>
            </span>
            <span className='text-yellow-500'>
              <i className='fas fa-star'></i>
            </span>
            <span className='text-yellow-500'>
              <i className='fas fa-star'></i>
            </span>
            <span className='text-yellow-500'>
              <i className='fas fa-star'></i>
            </span>
            <span className='text-gray-500 ml-2'>(3)</span> {/* set later */}
            <div className='border-r h-4 w-1 mx-2 text-gray-500'></div>
            <span className='text-gray-500'>2.4k Ratings</span>
            <div className='border-r h-3 w-1 mx-2 text-gray-500'></div>
            <span className='text-gray-500'>{product?.totalSold} Sold</span>
          </div>
          <div className='text-2xl font-bold mt-2'>
            {formatCurrency(product?.price)}{' '}
          </div>

          <div className='mt-4'>
            <span className='font-bold'>SIZE - COLOR</span>
            <div className='flex mt-2'>
              <select
                className='border px-4 py-2 mr-2'
                value={selectedVariant || ''}
                onChange={e => setSelectedVariant(e.target.value)}
              >
                <option value='' disabled>
                  Choose variant
                </option>
                {Array.isArray(product.variants) &&
                product.variants.length > 0 ? (
                  product.variants.map(variant => (
                    <option
                      key={variant._id}
                      value={`${variant.size} - ${variant.color}`}
                    >
                      {variant.size} - {variant.color} ({variant.stock} in
                      stock)
                    </option>
                  ))
                ) : (
                  <option disabled>No variants available</option>
                )}
              </select>
            </div>
          </div>
          <div className='mt-4'>
            <span className='font-bold'>QUANTITY</span>
            <div className='flex mt-2 items-center'>
              <button className='border px-4 py-2' onClick={decreaseQuantity}>
                -
              </button>
              <span className='px-4'>{quantity}</span>
              <button className='border px-4 py-2' onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            <button
              className='bg-black text-white px-4 py-2 w-full hover:bg-gray-800'
              onClick={() => handleAddToCart(product?._id)}
            >
              Add to Cart
            </button>
            <button
              className='border px-4 py-2 w-full hover:bg-gray-100'
              onClick={() => handleAddToCart(product?._id, true)}
            >
              Buy Now
            </button>
          </div>
          <div className='mt-4'>
            <h2 className='font-bold'>DESCRIPTION</h2>
            <p className='mt-2'>{product.description}</p>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='font-bold text-lg'>Add Your Review</h2>
        <div className='border p-4 mt-2'>
          <textarea
            className='w-full p-2 border mb-2'
            rows='4'
            placeholder='Write your review...'
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          ></textarea>
          <select
            className='border p-2 mb-2'
            value={rating || ''}
            onChange={e => setRating(Number(e.target.value))}
          >
            <option value=''>Select Rating</option>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>
                {star} Star{star > 1 && 's'}
              </option>
            ))}
          </select>
          <button
            className='bg-blue-500 text-white px-4 py-2 w-full hover:bg-blue-600'
            onClick={handleAddReview}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='font-bold text-lg'>Reviews</h2>
        <div className='border p-4 mt-2'>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className='mt-4'>
                <p className='font-bold'>
                  {review.user?.firstName || 'Anonymous'}
                </p>
                <p className='text-sm text-gray-500'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
                <p className='mt-2'>{review.reviewText}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='font-bold text-lg'>YOU MAY ALSO LIKE</h2>
        <div className='flex mt-4 space-x-4 overflow-x-auto'>
          <ProductList
            products={productByCategory}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
