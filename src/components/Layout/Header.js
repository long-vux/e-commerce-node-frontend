import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from '../../assets/images/logo.png';
import { Search, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import vingtageboy2 from '../../assets/images/vingtageboy2.png';
import { Link } from 'react-router-dom';

const categories = {
  men: [
    { title: 'Vintage shirt', items: ['Polo', 't-shirt', 'Polo', 't-shirt', 'Polo', 't-shirt'] },
    { title: 'Pant', items: ['Polo', 't-shirt', 'Polo', 't-shirt', 'Polo', 't-shirt'] },
  ],
  women: [
    { title: 'Dresses', items: ['Maxi', 'Midi', 'Mini', 'Casual', 'Formal'] },
    { title: 'Shoes', items: ['Heels', 'Flats', 'Boots', 'Sneakers'] },
  ],
  kid: [
    { title: 'Dresses', items: ['Maxi', 'Midi', 'Mini', 'Casual', 'Formal'] },
    { title: 'Shoes', items: ['Heels', 'Flats', 'Boots', 'Sneakers'] },
  ],
  unisex: [
    { title: 'Dresses', items: ['Maxi', 'Midi', 'Mini', 'Casual', 'Formal'] },
    { title: 'Shoes', items: ['Heels', 'Flats', 'Boots', 'Sneakers'] },
  ],
};


const cartItems = [
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 99.99,
    "quantity": 1,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
  },
  {
    "id": 2,
    "name": "Smart Watch",
    "price": 199.99,
    "quantity": 2,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
  },
  {
    "id": 3,
    "name": "Bluetooth Speaker",
    "price": 49.99,
    "quantity": 3,
    "image": "http://localhost:3000/static/media/item5-1.506f4605917d1b5ddddf.png",
  }
]

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Memoize handleCloseCart to prevent it from changing on every render
  const handleCloseCart = useCallback(() => {
    setIsCartVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        handleCloseCart();
      }
    };

    if (isCartVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartVisible, handleCloseCart]);

  const handleNavMouseOver = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearchClose = () => {
    setIsSearchVisible(false);
  };

  const handleCartClick = () => {
    setIsCartVisible(prev => !prev);
    console.log(isCartVisible);
  };


  return (
    <header className="w-full bg-white shadow-md relative z-50">
      {!isSearchVisible ? (
        <div className="flex flex-col md:flex-row justify-around items-center px-4 py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img src={logo} alt="Logo" className="w-40 h-20 md:w-48 md:h-24" />
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-16 text-lg font-bold">
              {Object.keys(categories).map((category) => (
                <li key={category} className="relative group">
                  <Link
                    to={`/shopping/${category}`}
                    onMouseOver={() => handleNavMouseOver(category)}
                    className="hover:text-blue-500 focus:outline-none"
                  >
                    {category.toUpperCase()}
                  </Link>
                  {activeCategory === category && (
                    <div className="absolute w-[1000px] bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-around items-center p-4 w-full">
                        {categories[activeCategory].map((categoryGroup) => (
                          <div key={categoryGroup.title} className="p-4">
                            <h3 className="font-bold">{categoryGroup.title}</h3>
                            <ul>
                              {categoryGroup.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div>
                          <img
                            src={vingtageboy2}
                            alt="Category"
                            className="w-48 h-32 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <Search fontSize='large' onClick={handleSearchClick} />
            </div>
            <Link to="/profile" className="text-gray-600 hover:text-blue-500">
              <PersonOutlineOutlined fontSize='large' />
            </Link>
            <div className="relative">
              <button ref={buttonRef} className="text-gray-600 hover:text-blue-500" onClick={handleCartClick}>
                <ShoppingCartOutlined fontSize='large' />
              </button>
              {isCartVisible && (
                <div ref={dropdownRef} className="absolute right-0 bg-black shadow-lg opacity-0 opacity-100 transition-opacity duration-300">
                  <div className="flex justify-around gap-4 p-4 w-[347px] h-full flex-col bg-white">
                    {cartItems.map((item) => (
                      <div className="relative border-b border-gray-300">
                        <div className='flex items-center gap-4'>
                          <img src={item.image} alt={item.name} className='w-24 h-24' />
                          <div>
                            <div key={item.id}>{item.name}</div>
                            <div key={item.id} className='font-bold'>{item.price}$</div>
                          </div>
                        </div>
                        <div className='absolute right-2 bottom-2'>
                          <button>x{item.quantity}</button>
                        </div>
                      </div>
                    ))}
                    <div className='flex justify-between items-center pt-10'>
                      <div className='text-gray-500'>4 More Items In Cart</div>
                      <button className='bg-black text-white p-2 rounded-md'>View Cart</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 py-8">
          <div className="relative w-full flex justify-center">
            <div className="absolute inset-y-0 left-[80px] md:left-[530px] flex items-center pointer-events-none">
              <Search className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search product ..."
              className="w-[70%] md:w-[30%] p-2 pl-10 border border-2 border-black rounded-[50px]"
            />
          </div>
          <button onClick={handleSearchClose} className="absolute p-2 top-[10%] right-[1%] font-bold text-2xl">
            X
          </button>
        </div>
      )}

      {/* Secondary Navigation */}
      {!isSearchVisible && (
        <div className="hidden md:flex justify-center bg-black text-white py-2">
          <ul className="flex gap-12 italic">
            <li><a href="/" className="hover:text-blue-400">Thrift Finds</a></li>
            <li><a href="/" className="hover:text-blue-400">SecondHand Chic</a></li>
            <li><a href="/" className="hover:text-blue-400">Y2k</a></li>
            <li><a href="/" className="hover:text-blue-400">Nike</a></li>
            <li><a href="/" className="hover:text-blue-400">Puma</a></li>
            <li><a href="/" className="hover:text-blue-400">Bargain Bonanza</a></li>
            <li><a href="/" className="hover:text-blue-400">Balenciaga</a></li>
            <li><a href="/" className="hover:text-blue-400">Adidas</a></li>
            <li><a href="/" className="hover:text-blue-400">Gucci</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
