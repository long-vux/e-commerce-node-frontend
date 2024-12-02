import React from 'react'
import poster from '../assets/images/poster.png'
import product1 from '../assets/images/item5-1.png'
import topBrands from '../assets/images/top-brands.png'
import menWomen from '../assets/images/men-women.png'
import shopByStyle from '../assets/images/shop-by-style.png'
import ProductList from '../components/Products/ProductList'
import bg from '../assets/images/bg.png'
import MySwiper from '../components/MySwiper'

// SHOP BY STYLE
import y2k from '../assets/images/y2k.png'
import skater from '../assets/images/skater.png'
import vintage from '../assets/images/vingtageboy2.png'

// NEW ARRIVALS
import img1 from '../assets/images/item6-1.png'
import img2 from '../assets/images/item3-1.png'
import img3 from '../assets/images/item4-1.png'
import img4 from '../assets/images/item5-1.png'
import ImageWithText from '../components/ImageWithText'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Stay connected on the go with this sleek smart watch.'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Portable Bluetooth speaker with excellent sound quality.'
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    price: 29.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Ergonomic gaming mouse with customizable buttons.'
  },
  {
    id: 5,
    name: '4K Monitor',
    price: 299.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Ultra HD 4K monitor for crisp and clear visuals.'
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Responsive mechanical keyboard with RGB lighting.'
  },
  {
    id: 7,
    name: 'External Hard Drive',
    price: 79.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: '1TB external hard drive for all your storage needs.'
  },
  {
    id: 8,
    name: 'Wireless Charger',
    price: 19.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Fast wireless charger compatible with most smartphones.'
  },
  {
    id: 9,
    name: 'Action Camera',
    price: 149.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Capture your adventures with this durable action camera.'
  },
  {
    id: 10,
    name: 'Smartphone Gimbal',
    price: 119.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Stabilize your smartphone videos with this gimbal.'
  },
  {
    id: 11,
    name: 'Portable SSD',
    price: 129.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'High-speed portable SSD with 500GB capacity.'
  },
  {
    id: 12,
    name: 'Virtual Reality Headset',
    price: 249.99,
    image:
      'http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png',
    description: 'Immerse yourself in virtual worlds with this VR headset.'
  }
]

const Home = () => {
  const handleAddToCart = id => {
    console.log(`Added product with id ${id} to cart`)
  }

  const imageArray = [
    { src: img1, alt: 'Item 1' },
    { src: img2, alt: 'Item 2' },
    { src: img3, alt: 'Item 3' },
    { src: img4, alt: 'Item 4' },
    { src: img2, alt: 'Item 2' },
    { src: img3, alt: 'Item 3' },
    { src: img4, alt: 'Item 4' },
    { src: img2, alt: 'Item 2' },
    { src: img3, alt: 'Item 3' },
    { src: img4, alt: 'Item 4' },
    { src: img4, alt: 'Item 4' }
  ]

  return (
    <div
      className='w-full h-full bg-fixed bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className='w-full h-full flex flex-col '>
        {/* poster image */}
        <div className='w-full lg:h-full md:h-[300px] container-fluid'>
          <img
            src={poster}
            alt='poster'
            className='w-full h-full object-cover'
          />
        </div>

        {/* New Arrivals Section */}
        <div className='w-full h-full mt-10 md:mt-20 px-4 md:px-8'>
          <MySwiper images={imageArray} heading='NEW ARRIVALS' />
        </div>

        {/* popular brands section */}
        <div className='w-full h-full mt-20 flex flex-col items-center gap-10'>
          <h1 className='text-center text-[50px] italic font-semibold'>
            Popular Vintage Brands
          </h1>

          <div className='bg-white border-t border-b border-black w-full center'>
            <img src={topBrands} alt='top brands' className='m-10' />
          </div>

          {/* CATEGORY */}
          <div className='w-full h-full flex justify-center items-center mt-10'>
            <div className='relative w-full max-w-[1079px] h-auto bg-white'>
              <img
                src={menWomen}
                alt='men-women'
                className='w-full h-full object-cover'
              />
              <h1 className='text-center font-black text-[40px] md:text-[60px] lg:text-[80px] italic font-semibold absolute top-[50%] left-[25%] lg:left-[23%] translate-x-[-50%] translate-y-[-50%] text-white z-10'>
                MENS
              </h1>
              <h1 className='text-center font-black text-[40px] md:text-[60px] lg:text-[80px] italic font-semibold absolute top-[50%] left-[75%] translate-x-[-50%] translate-y-[-50%] text-white z-10'>
                WOMENS
              </h1>
              <button className='absolute top-[85%] left-[25%] lg:left-[23%] translate-x-[-50%] translate-y-[-50%] text-black z-10 bg-white px-5 md:px-8 lg:px-10 py-2 border-2 border-black italic text-sm md:text-lg lg:text-xl hover:bg-black hover:text-white transition-all bold inline-block hover:scale-110'>
                Shop Now
              </button>
              <button className='absolute top-[85%] left-[75%] lg:left-[77%] translate-x-[-50%] translate-y-[-50%] text-black z-10 bg-white px-5 md:px-8 lg:px-10 py-2 border-2 border-black italic text-sm md:text-lg lg:text-xl hover:bg-black hover:text-white transition-all bold inline-block hover:scale-110'>
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* shop by styles section */}
        <div className='w-full h-full mt-20 flex flex-col justify-center items-center'>
          <h1 className='text-center text-[50px] italic font-semibold'>
            Shop By Styles
          </h1>
          <div className='bg-[rgba(217,217,217,0.2)] w-[100%] mt-10 relative flex justify-center gap-10 items-center py-5'>
            <ImageWithText imgSrc={y2k} styleName='Y2K' />
            <ImageWithText imgSrc={vintage} styleName='vintage' />
            <ImageWithText imgSrc={skater} styleName='skater' />
            <ImageWithText imgSrc={vintage} styleName='vintage' />
     
          </div>
        </div>

        {/* best sellers section */}
        <div className='w-[80%] mx-auto h-full mt-20 flex flex-col justify-center items-center'>
          <h1 className='text-center text-[50px] italic font-semibold mb-10'>
            Best Sellers
          </h1>
          <ProductList products={products} handleAddToCart={handleAddToCart} />

          <button className='w-[180px] h-[50px] border border-2 border-black my-20 hover:scale-110 hover:bg-black  transition-all duration-300 '>
            <span className='text-center text-black font-semibold text-[24px] italic p-8 hover:text-white'>
              {' '}
              Shop now
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
