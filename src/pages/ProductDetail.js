import React from 'react';
import ProductList from '../components/Products/ProductList';


const products = [
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 99.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "High-quality wireless headphones with noise cancellation."
  },
  {
    "id": 2,
    "name": "Smart Watch",
    "price": 199.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Stay connected on the go with this sleek smart watch."
  },
  {
    "id": 3,
    "name": "Bluetooth Speaker",
    "price": 49.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Portable Bluetooth speaker with excellent sound quality."
  },
  {
    "id": 4,
    "name": "Gaming Mouse",
    "price": 29.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Ergonomic gaming mouse with customizable buttons."
  },
  {
    "id": 5,
    "name": "4K Monitor",
    "price": 299.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Ultra HD 4K monitor for crisp and clear visuals."
  },
  {
    "id": 6,
    "name": "Mechanical Keyboard",
    "price": 89.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Responsive mechanical keyboard with RGB lighting."
  }
]
const ProductDetail = () => {

  const handleAddToCart = (id) => {
    console.log(`Added product with id ${id} to cart`);
  };

  return (
    <div className="md:p-20 p-4">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Men</a> /
        <a href="/" className="hover:underline">Nano Melange Fabric Men's Straight-Leg Pants Keeps Form Less Wrinkles</a>
      </nav>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="relative">
            <img src="https://placehold.co/300x300" alt="product" className="w-full" />
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">50%</div>
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
          <h1 className="text-xl font-bold">Nano Melange Fabric Men's Straight-Leg Pants Keeps Form Less Wrinkles</h1>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-yellow-500"><i className="fas fa-star"></i></span>
            <span className="text-gray-500 ml-2">(2)</span>
          </div>
          <div className="text-2xl font-bold mt-2">20.00$ <span className="text-red-500 line-through">40.00$</span></div>
          <div className="mt-4">
            <span className="font-bold">SIZE</span>
            <div className="flex mt-2">
              <button className="border px-4 py-2 mr-2">XL</button>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-bold">QUANTITY</span>
            <div className="flex mt-2 items-center">
              <button className="border px-4 py-2">-</button>
              <span className="px-4">1</span>
              <button className="border px-4 py-2">+</button>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-black text-white px-4 py-2 w-full mb-2">Add to Cart</button>
            <button className="border px-4 py-2 w-full">Buy Now</button>
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
          <ProductList products={products} handleAddToCart={handleAddToCart} />
        </div>
      </div>  
    </div>
  );
};

export default ProductDetail;