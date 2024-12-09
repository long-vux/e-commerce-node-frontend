import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useContext
  } from 'react'
  import useAxios from '../../utils/axiosInstance'
  import { UserContext } from '../../contexts/UserContext'
  import logo from '../../assets/images/logo.png'
  import {
    Search,
    PersonOutlineOutlined,
    ShoppingCartOutlined,
    Menu as MenuIcon,
    Close as CloseIcon
  } from '@mui/icons-material'
  import { Link, useNavigate } from 'react-router-dom'
  import Search_product from './Search_product'
  
  const Header = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const axios = useAxios();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const displayCartItems = cartItems?.slice(0, 4);
    const remainingItemsCount = cartItems?.length - displayCartItems?.length;
  
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
  
    const handleCloseCart = useCallback((event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsCartVisible(false);
      }
    }, []);
  
    const getCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/product/get-categories`);
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    useEffect(() => {
      getCategories();
    }, []);
  
    useEffect(() => {
      if (isCartVisible) {
        document.addEventListener('mousedown', handleCloseCart);
      } else {
        document.removeEventListener('mousedown', handleCloseCart);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleCloseCart);
      };
    }, [isCartVisible, handleCloseCart]);
  
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${apiUrl}api/cart/get-minicart`);
          setCartItems(response.data.items);
        } catch (err) {
          console.error(err);
        }
      };
  
      if (user) {
        fetchCartItems();
      } else {
        setCartItems([]);
      }
    }, [axios, apiUrl, user]);
  
    const handleSearchClick = () => {
      setIsSearchVisible(true);
    };
  
    const handleSearchClose = () => {
      setIsSearchVisible(false);
    };
  
    const handleCartClick = () => {
      setIsCartVisible((prev) => !prev);
    };
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen((prev) => !prev);
    };
  
    return (
      <header className='w-full bg-white shadow-md sticky z-40 '>
        {!isSearchVisible ? (
          <div className='flex flex-col md:flex-row justify-between items-center px-5'>
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
  
            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button onClick={toggleMobileMenu} className='text-gray-600 hover:text-blue-500'>
                {isMobileMenuOpen ? <CloseIcon fontSize='large' /> : <MenuIcon fontSize='large' />}
              </button>
            </div>
  
            {/* Navigation Menu */}
            <nav className={`mt-4 md:mt-0 md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row gap-4 md:gap-16 text-lg font-bold`}>
              <ul className='flex flex-col md:flex-row gap-4 md:gap-16'>
                {categories?.map((category) => (
                  <li key={category} className='relative group'>
                    <Link
                      to={`category/${category}`}
                      className='hover:text-blue-500 focus:outline-none'
                    >
                      {category.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
  
              {/* Search Icon in Mobile Menu */}
              <div className='flex justify-between items-center gap-4 mt-4 md:mt-0'>
                <div className='text-gray-600 hover:text-blue-500 cursor-pointer' onClick={handleSearchClick}>
                  <Search fontSize='large' />
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
                </div>
              </div>
            </nav>
          </div>
        ) : (
          <div className='p-4 py-8 transition-all duration-300'>
            <Search_product />
            <button
              onClick={handleSearchClose}
              className='absolute p-2 top-[10%] right-[1%] font-bold text-2xl'
            >
              <CloseIcon />
            </button>
          </div>
        )}
  
        {/* Infinite scrolling */}
        {!isSearchVisible && (
          <div className='hidden md:flex justify-center bg-black text-white py-2 scroll-container tracking-wide font-bold'>
            <div className='flex gap-12 italic'>
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
                <p className='whitespace-nowrap'>Retro</p>            </div>
            </div>
          </div>
        )}
      </header>
    );
  };
  
  export default Header;
  