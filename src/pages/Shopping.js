import React from 'react';
import poster from '../assets/images/poster.png';
import { useParams } from 'react-router-dom';
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
  },
  {
    "id": 7,
    "name": "External Hard Drive",
    "price": 79.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "1TB external hard drive for all your storage needs."
  },
  {
    "id": 8,
    "name": "Wireless Charger",
    "price": 19.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Fast wireless charger compatible with most smartphones."
  },
  {
    "id": 9,
    "name": "Action Camera",
    "price": 149.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Capture your adventures with this durable action camera."
  },
  {
    "id": 10,
    "name": "Smartphone Gimbal",
    "price": 119.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Stabilize your smartphone videos with this gimbal."
  },
  {
    "id": 11,
    "name": "Portable SSD",
    "price": 129.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "High-speed portable SSD with 500GB capacity."
  },
  {
    "id": 12,
    "name": "Virtual Reality Headset",
    "price": 249.99,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
    "description": "Immerse yourself in virtual worlds with this VR headset."
  }
]

const Shopping = () => {
  const { category } = useParams();

  const handleAddToCart = (id) => {
    console.log(`Added product with id ${id} to cart`);
  };

  return <div className="relative">
    <img src={poster} alt="poster" className="relative w-full h-[300px] object-cover" />
    <h1 className="absolute top-[120px] left-0 right-0 text-center text-[50px] font-bold">{category.toUpperCase()}</h1>

    {/* filter section */}
    {/* <div className="flex justify-center items-center p-4 md:p-20">
      <button className="bg-red-500 text-white p-2 rounded italic hover:bg-gray-800 transition-colors">
        Filter by
      </button>
    </div> */}

    {/* products list */}
    <div className="flex justify-center items-center p-4 md:p-20">
      <ProductList products={products} handleAddToCart={handleAddToCart} /> 
    </div>
  </div>;
};

export default Shopping;