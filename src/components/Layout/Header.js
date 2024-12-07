import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import useAxios from '../../utils/axiosInstance'
import { UserContext } from '../../contexts/UserContext'
import logo from '../../assets/images/logo.png'
import { Search, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

const Header = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const axios = useAxios();
  const [cartItems, setCartItems] = useState([]);
  const displayCartItems = cartItems?.slice(0, 4);
  const remainingItemsCount = cartItems?.length - displayCartItems?.length;

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isCartVisible, setIsCartVisible] = useState(false)

  const { user } = useContext(UserContext);

  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const handleCloseCart = useCallback(() => {
    setIsCartVisible(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        handleCloseCart()
      }
    }

    if (isCartVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCartVisible, handleCloseCart])

  const fetchCartItems = async () => {
    console.log('fetching cart items')
    try {
      const response = await axios.get(`${apiUrl}api/cart/get-minicart`, { withCredentials: true })
      console.log('response', response)
      setCartItems(response.data.items)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearchClick = () => {
    setIsSearchVisible(true)
  }

  const handleSearchClose = () => {
    setIsSearchVisible(false)
  }

  const handleCartClick = () => {
    setIsCartVisible(prev => !prev)
    fetchCartItems()  
  }

  return (
    <header className='w-full bg-white shadow-md sticky z-40 '>
      {!isSearchVisible ? (
        <div className='flex flex-col md:flex-row justify-around items-center '>
          {/* Logo */}
          <div className='flex items-center'>
            <a href='/'>
              <img
                src={logo}
                alt='Logo'
                className='w-40 h-20 md:w-48 md:h-24'
              />
            </a>
          </div>
          <nav className='mt-4 md:mt-0'>
            <ul className='flex flex-col md:flex-row gap-4 md:gap-16 text-lg font-bold'>
              <li>
                <Link to='category/men'>MEN</Link>
              </li>
              <li>
                <Link to='category/women'>WOMEN</Link>
              </li>
              <li>
                <Link to='category/kid'>KID</Link>
              </li>
              <li>
                <Link to='category/unisex'>UNISEX</Link>
              </li>
            </ul>
          </nav>

          {/* Icons */}
          <div className='flex items-center gap-4 mt-4 md:mt-0'>
            <div className='text-gray-600 hover:text-blue-500 cursor-pointer'>
              <Search fontSize='large' onClick={handleSearchClick} />
            </div>
            {user ? (
              <Link to='/profile' className='text-gray-600 hover:text-blue-500'>
                <PersonOutlineOutlined fontSize='large' />
              </Link>
            ) : (
              <Link to='/login' className='text-gray-600 hover:text-blue-500'>
                <PersonOutlineOutlined fontSize='large' />
              </Link>
            )}
            <div className='relative'>
              <button
                ref={buttonRef}
                className='text-gray-600 hover:text-blue-500'
                onClick={handleCartClick}
              >
                <ShoppingCartOutlined fontSize='large' />
              </button>

              {/* This is cart */}
              {isCartVisible && (
                <div
                  ref={dropdownRef}
                  className='absolute right-0 bg-black shadow-lg opacity-0 opacity-100 transition-all duration-300 z-50'
                >
                  <div className='flex justify-around gap-4 p-4 w-[347px] h-full flex-col bg-white transition-all duration-300'>
                    {displayCartItems?.map(item => (
                      <div className='relative border-b border-gray-300'>
                        <div className='flex items-center gap-4'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-24 h-24'
                          />
                          <div>
                            <div key={item.id}>{item.name}</div>
                            <div key={item.id} className='font-bold'>
                              {item.price}$
                            </div>
                          </div>
                        </div>
                        <div className='absolute flex items-center gap-2 right-2 bottom-2'>
                          {item.variant && <div className='text-gray-500'>{item.variant}</div>}
                          <button>x{item.quantity}</button>
                        </div>
                      </div>
                    ))}
                    <div className='flex justify-between items-center pt-10'>
                      <div className='text-gray-500'>
                        {
                          remainingItemsCount > 0 ? `${remainingItemsCount} More Items In Cart` : 'More Details In Cart'
                        }
                      </div>
                      <button
                        className='bg-black text-white p-2 rounded-md'
                        onClick={() => (window.location.href = '/cart')}
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4 py-8 transition-all duration-300'>
          <div className='relative w-full flex justify-center  '>
            <div className='flex justify-between items-center w-fit border px-5 rounded-full'>
              <Search className='text-gray-500' />
              <input
                type='text'
                placeholder='Search product ...'
                className='w-full  p-2 border-none focus:outline-none border border-red'
              />
            </div>
          </div>
          <button
            onClick={handleSearchClose}
            className='absolute p-2 top-[10%] right-[1%] font-bold text-2xl'
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/*  infinite scrolling */}
      {!isSearchVisible && (
        <div className='hidden md:flex justify-center bg-black text-white py-2 scroll-container tracking-wide font-bold -z-20'>
          <div className='flex gap-12 italic RightToLeft z-0'>
            <div className='flex gap-12'>
              <p className='whitespace-nowrap'>Thrift Finds</p>
              <p className='whitespace-nowrap'>SecondHand Chic</p>
              <p className='whitespace-nowrap'>Y2k</p>
              <p className='whitespace-nowrap'>Nike</p>
              <p className='whitespace-nowrap'>Puma</p>
              <p className='whitespace-nowrap'>Bargain Bonanza</p>
              <p className='whitespace-nowrap'>Balenciaga</p>
              <p className='whitespace-nowrap'>Adidas</p>
              <p className='whitespace-nowrap'>Gucci</p>
              <p className='whitespace-nowrap'>Vintage</p>
              <p className='whitespace-nowrap'>Streetwear</p>
              <p className='whitespace-nowrap'>Fast Fashion</p>
              <p className='whitespace-nowrap'>Eco-Friendly</p>
              <p className='whitespace-nowrap'>Luxury</p>
              <p className='whitespace-nowrap'>Designer</p>
              <p className='whitespace-nowrap'>Upcycled</p>
              <p className='whitespace-nowrap'>Fashionista</p>
              <p className='whitespace-nowrap'>Trendy</p>
              <p className='whitespace-nowrap'>Minimalism</p>
              <p className='whitespace-nowrap'>Retro</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
