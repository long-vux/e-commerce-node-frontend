import React, { useState, useEffect } from 'react';
import ProductList from '../components/Products/ProductList';
import { useParams } from 'react-router-dom';
import ProductsAPI from '../api/ProductsAPI';

const products = [
  // ... your product data
];

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await ProductsAPI.getProductById(id);
        setProduct(fetchedProduct.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product when the component mounts or when the ID changes

  const handleAddToCart = (id) => {
    console.log(`Added product with id ${id} to cart, quantity: ${quantity}`);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div className='md:p-20 p-4'>
      <nav className='text-sm text-gray-500 mb-4'>
        <a href='/' className='hover:underline'>
          Men
        </a>{' '}
        /
        <a href='/' className='hover:underline'>
          {product.name}
        </a>
      </nav>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2'>
          <div className='relative'>
            <img src={product.image} alt='product' className='w-full' />
            <div className='absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1'>
              50%
            </div>
          </div>
        </div>
        <div className='md:w-1/2 md:pl-8'>
          <h1 className='text-xl font-bold'>{product.name}</h1>
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
            <span className='text-gray-500 ml-2'>(2)</span>
          </div>
          <div className='text-2xl font-bold mt-2'>{product.price}$ </div>
          <div className='mt-4'>
            <span className='font-bold'>SIZE - COLOR</span>
            <div className='flex mt-2'>
              <select className='border px-4 py-2 mr-2'>
                {Array.isArray(product.variants) && product.variants.length > 0 ? (
                  product.variants.map((variant) => (
                    <option key={variant._id} value={variant.size}>
                      {variant.size} - {variant.color} ({variant.stock} in stock)
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
              <button className='border px-4 py-2' onClick={decreaseQuantity}>-</button>
              <span className='px-4'>{quantity}</span>
              <button className='border px-4 py-2' onClick={increaseQuantity}>+</button>
            </div>
          </div>
          <div className='mt-4'>
            <button className='bg-black text-white px-4 py-2 w-full mb-2' onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
            <button className='border px-4 py-2 w-full'>Buy Now</button>
          </div>
          <div className='mt-4'>
            <h2 className='font-bold'>DESCRIPTION</h2>
            <p className='mt-2'>{product.description}</p>
          
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='font-bold text-lg'>Review</h2>
        <div className='border p-4 mt-2'>
          <div className='flex items-center'>
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
            <span className='ml-2'>5/5</span>
          </div>
          <div className='flex mt-2'>
            <button className='border px-4 py-2 mr-2'>All</button>
            <button className='border px-4 py-2 mr-2'>1 star</button>
            <button className='border px-4 py-2 mr-2'>2 star</button>
            <button className='border px-4 py-2 mr-2'>3 star</button>
            <button className='border px-4 py-2 mr-2'>4 star</button>
            <button className='border px-4 py-2'>5 star</button>
          </div>
          <div className='mt-4'>
            <button className='border px-4 py-2 w-full'>Your review</button>
          </div>
          <div className='mt-4'>
            <p className='font-bold'>Alex</p>
            <p className='text-sm text-gray-500'>16 days ago</p>
            <p className='mt-2'>
              Great jacket, very nice to wear. Keeps the wind out. Just note the
              size, anyone taller than 6'2" should go for a larger size. The
              color is also a bit darker than the photo but still close. I love
              it!
            </p>
            <button className='text-blue-500 mt-2'>Reply</button>
          </div>
          <div className='mt-4'>
            <p className='font-bold'>Bob</p>
            <p className=' text-sm text-gray-500'>1 month ago</p>
            <p className='mt-2'>
              The jacket is great and the quality is very good. I ordered one
              size too big and was able to exchange it. The process was smooth
              and I'm very satisfied!
            </p>
            <button className='text-blue-500 mt-2'>Reply</button>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='font-bold text-lg'>YOU MAY ALSO LIKE</h2>
        <div className='flex mt-4 space-x-4 overflow-x-auto'>
          <ProductList products={products} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail