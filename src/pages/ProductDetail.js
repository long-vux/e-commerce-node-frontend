import React, { useEffect, useState } from 'react';
import ProductList from '../components/Products/ProductList';
import useAxios from '../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const axios = useAxios();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productByCategory, setProductByCategory] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/product/${productId}`)
      .then(res => {
        setProduct(res.data.data.product)
        setVariants(res.data.data.product.variants)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [productId])

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/product/category/${product?.category}`)
      .then(res => {
        // exclude the current product
        const products = res.data.data.filter(product => product._id !== productId);
        setProductByCategory(products)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [product?.category])

  const handleAddToCart = (id) => {
    setIsLoading(true);
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}api/cart/add-to-cart`, {
      productId: id,
      quantity: quantity,
      variant: selectedVariant
    })
      .then(res => {
        toast.success('Product added to cart');
      })
      .catch(err => {
        toast.error('Error adding product to cart');
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <div className="md:p-20 p-4">
      <nav className="text-sm text-gray-500 mb-4">
        <a href={`/category/${product?.category}`} className="hover:underline">{product?.category}</a> /
        <a href={`/product/${product?._id}`} className="hover:underline"> {product?.name}</a>
      </nav>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="relative">
            <img src={product?.image} alt={product?.name} className="w-full" />
          </div>
          <div className="flex mt-2 space-x-2">
            <img src="https://placehold.co/60x60" alt="Thumbnail 1" className="w-20 h-20 border" />
            <img src="https://placehold.co/60x60" alt="Thumbnail 2" className="w-20 h-20 border" />
            <img src="https://placehold.co/60x60" alt="Thumbnail 3" className="w-20 h-20 border" />
            <img src="https://placehold.co/60x60" alt="Thumbnail 4" className="w-20 h-20 border" />
            <img src="https://placehold.co/60x60" alt="Thumbnail 5" className="w-20 h-20 border" />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-xl font-bold">{product?.name}</h1>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-gray-500 ml-2">(3)</span> {/* set later */}
            <div className="border-r h-4 w-1 mx-2 text-gray-500"></div>
            <span className="text-gray-500">2.4k Ratings</span>
            <div className="border-r h-3 w-1 mx-2 text-gray-500"></div>
            <span className="text-gray-500">{product?.totalSold} Sold</span>
          </div>
          <div className="text-2xl font-bold mt-2">{product?.price}$ <span className="text-red-500 line-through">{product?.price * 2}$</span></div>
          <div className="mt-4">
            <span className="font-bold">VARIANTS</span>
            <div className="flex flex-col mt-2">
              {variants.map((variant, index) => (
                <div className="flex flex-row justify-start gap-2 items-center" key={index}>
                  <button className={`border h-10 w-[100px] hover:bg-gray-100 ${selectedVariant === variant.name ? 'bg-gray-200' : ''}`} onClick={() => setSelectedVariant(variant.name)}>{variant.name}</button>
                  <p className="text-sm text-gray-500">{variant.stock} in stock</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-bold">QUANTITY</span>
            <div className="flex flex-row justify-start gap-2 items-center">
              <input type="number" className="border h-10 w-10 text-center" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="bg-black text-white px-4 py-2 w-full hover:bg-gray-800" onClick={() => handleAddToCart(product?._id)}>Add to Cart</button>
            <button className="border px-4 py-2 w-full hover:bg-gray-100">Buy Now</button>
          </div>
          <div className="mt-4">
            <h2 className="font-bold">DESCRIPTION</h2>
            <p className="mt-2">Vintage beige Carhartt jacket, fits xx-large.</p>
            <p className="mt-2"><span className="font-bold">GENDER:</span> mens</p>
            <p className="mt-2"><span className="font-bold">CONDITION:</span> good - small marks over front and sleeves, sleeve hems fraying slightly.</p>
            <p className="mt-2"><span className="font-bold">STYLE:</span> jacket</p>
            <p className="mt-2"><span className="font-bold">ERA:</span> 1990s</p>
            <p className="mt-2"><span className="font-bold">COLOUR:</span> beige</p>
            <p className="mt-2"><span className="font-bold">FABRIC:</span> cotton</p>
            <p className="mt-2"><span className="font-bold">Notes:</span> Size 42</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-lg">Review</h2>
        <div className="border p-4 mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="ml-2">5/5</span>
          </div>
          <div className="flex mt-2">
            <button className="border px-4 py-2 mr-2">All</button>
            <button className="border px-4 py-2 mr-2">1 star</button>
            <button className="border px-4 py-2 mr-2">2 star</button>
            <button className="border px-4 py-2 mr-2">3 star</button>
            <button className="border px-4 py-2 mr-2">4 star</button>
            <button className="border px-4 py-2">5 star</button>
          </div>
          <div className="mt-4">
            <button className="border px-4 py-2 w-full">Your review</button>
          </div>
          <div className="mt-4">
            <p className="font-bold">Alex</p>
            <p className="text-sm text-gray-500">16 days ago</p>
            <p className="mt-2">Great jacket, very nice to wear. Keeps the wind out. Just note the size, anyone taller than 6'2" should go for a larger size. The color is also a bit darker than the photo but still close. I love it!</p>
            <button className="text-blue-500 mt-2">Reply</button>
          </div>
          <div className="mt-4">
            <p className="font-bold">Bob</p>
            <p className="text-sm text-gray-500">1 month ago</p>
            <p className="mt-2">The jacket is great and the quality is very good. I ordered one size too big and was able to exchange it. The process was smooth and I'm very satisfied!</p>
            <button className="text-blue-500 mt-2">Reply</button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-lg">YOU MAY ALSO LIKE</h2>
        <div className="flex mt-4 space-x-4 overflow-x-auto">
          <ProductList products={productByCategory} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;