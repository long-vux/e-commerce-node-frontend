import React, { useState } from 'react'
import poster from '../assets/images/poster.png'
import { useParams } from 'react-router-dom'
import ProductList from '../components/Products/ProductList'
// LIST ITEMS
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'

// Check box
import Checkbox from '@mui/material/Checkbox'

import img from '../assets/images/item4-1.png'

const products = [
  {
    name: 'Basic T-shirt',
    price: 15.0,
    image: img,
    description: 'A comfortable cotton T-shirt for everyday wear.',
    tags: ['cotton', 'basic', 'casual'],
    categories: ['Clothing', 'Men'],
    variants: [
      { color: 'Red', size: 'S', stock: 100 },
      { color: 'Red', size: 'M', stock: 80 },
      { color: 'Blue', size: 'L', stock: 50 },
      { color: 'Green', size: 'XL', stock: 30 }
    ]
  },
  {
    name: 'Denim Jeans',
    price: 40.0,
    image: img,
    description: 'Stylish and comfortable denim jeans for casual wear.',
    tags: ['denim', 'jeans', 'casual'],
    categories: ['Clothing', 'Women'],
    variants: [
      { color: 'Blue', size: 'S', stock: 120 },
      { color: 'Blue', size: 'M', stock: 150 },
      { color: 'Black', size: 'L', stock: 80 },
      { color: 'Gray', size: 'XL', stock: 60 }
    ]
  },
  {
    name: 'Smartphone Case',
    price: 10.0,
    image: img,
    description: 'Protective and stylish case for your smartphone.',
    tags: ['accessory', 'phone', 'protective'],
    categories: ['Accessories', 'Electronics'],
    variants: [
      { color: 'Black', size: 'Universal', stock: 200 },
      { color: 'Red', size: 'Universal', stock: 180 },
      { color: 'Blue', size: 'For iPhone', stock: 150 },
      { color: 'Pink', size: 'For Samsung', stock: 120 }
    ]
  },
  {
    name: 'Running Shoes',
    price: 60.0,
    image: img,
    description:
      'Comfortable and durable shoes designed for running and sports.',
    tags: ['shoes', 'sports', 'running'],
    categories: ['Footwear', 'Sports'],
    variants: [
      { color: 'Black', size: '8', stock: 50 },
      { color: 'Black', size: '9', stock: 60 },
      { color: 'White', size: '10', stock: 40 },
      { color: 'Blue', size: '11', stock: 30 }
    ]
  },
  {
    name: 'Leather Wallet',
    price: 25.0,
    image: img,
    description: 'Genuine leather wallet with multiple compartments.',
    tags: ['leather', 'wallet', 'accessory'],
    categories: ['Accessories', 'Men'],
    variants: [
      { color: 'Black', size: 'One Size', stock: 80 },
      { color: 'Brown', size: 'One Size', stock: 100 }
    ]
  },
  {
    name: 'Casual Sneakers',
    price: 45.0,
    image: img,
    description: 'Stylish and comfortable sneakers for everyday wear.',
    tags: ['shoes', 'sneakers', 'casual'],
    categories: ['Footwear', 'Men'],
    variants: [
      { color: 'White', size: '8', stock: 120 },
      { color: 'Black', size: '9', stock: 150 },
      { color: 'Gray', size: '10', stock: 80 }
    ]
  },
  {
    name: 'Sunglasses',
    price: 20.0,
    image: img,
    description: 'Sleek sunglasses to protect your eyes in style.',
    tags: ['accessory', 'sunglasses', 'summer'],
    categories: ['Accessories', 'Unisex'],
    variants: [
      { color: 'Black', size: 'One Size', stock: 200 },
      { color: 'Tortoise', size: 'One Size', stock: 150 }
    ]
  },
  {
    name: 'Smart Watch',
    price: 120.0,
    image: img,
    description: 'A smart watch with health tracking and notifications.',
    tags: ['accessory', 'electronics', 'smartwatch'],
    categories: ['Electronics', 'Wearables'],
    variants: [
      { color: 'Black', size: 'One Size', stock: 50 },
      { color: 'Silver', size: 'One Size', stock: 70 }
    ]
  },
  {
    name: 'Yoga Mat',
    price: 25.0,
    image: img,
    description: 'Durable and comfortable yoga mat for workouts.',
    tags: ['fitness', 'yoga', 'workout'],
    categories: ['Sports', 'Fitness'],
    variants: [
      { color: 'Purple', size: 'Standard', stock: 200 },
      { color: 'Green', size: 'Standard', stock: 150 }
    ]
  },
  {
    name: 'Bluetooth Headphones',
    price: 50.0,
    image: img,
    description: 'Wireless headphones with great sound quality.',
    tags: ['electronics', 'audio', 'wireless'],
    categories: ['Electronics', 'Audio'],
    variants: [
      { color: 'Black', size: 'One Size', stock: 120 },
      { color: 'White', size: 'One Size', stock: 100 }
    ]
  },
  {
    name: 'Laptop Backpack',
    price: 40.0,
    image: img,
    description: 'A durable backpack designed to carry your laptop safely.',
    tags: ['accessory', 'bag', 'laptop'],
    categories: ['Accessories', 'Unisex'],
    variants: [
      { color: 'Black', size: 'One Size', stock: 150 },
      { color: 'Navy', size: 'One Size', stock: 100 }
    ]
  },
  {
    name: 'Winter Jacket',
    price: 80.0,
    image: img,
    description: 'Warm and stylish jacket perfect for winter.',
    tags: ['clothing', 'winter', 'jacket'],
    categories: ['Clothing', 'Women'],
    variants: [
      { color: 'Black', size: 'S', stock: 100 },
      { color: 'Gray', size: 'M', stock: 120 },
      { color: 'Red', size: 'L', stock: 80 },
      { color: 'Navy', size: 'XL', stock: 60 }
    ]
  },
  {
    name: 'Portable Charger',
    price: 30.0,
    image: img,
    description:
      'Keep your devices powered on the go with this portable charger.',
    tags: ['electronics', 'charger', 'mobile'],
    categories: ['Electronics', 'Mobile'],
    variants: [
      { color: 'Black', size: '10,000mAh', stock: 200 },
      { color: 'White', size: '10,000mAh', stock: 150 }
    ]
  }
]
const filters = [
  {
    label: 'Category',
    subLabels: ['Clothing', 'Accessories', 'Footwear', 'Electronics', 'Sports']
  },
  {
    label: 'Price Range',
    subLabels: ['Under $20', '$20 - $50', '$50 - $100', 'Over $100']
  },
  {
    label: 'Color',
    subLabels: ['Black', 'Gray', 'Red', 'Navy', 'White', 'Blue', 'Green']
  },
  {
    label: 'Size',
    subLabels: ['S', 'M', 'L', 'XL', 'One Size']
  }
]
const Shopping = () => {
  const { category } = useParams()

  const handleAddToCart = id => {
    console.log(`Added product with id ${id} to cart`)
  }

  // LIST COLLAPSE
  const [openStates, setOpenStates] = useState(filters.map(() => false))
  const [selectedFilters, setSelectedFilters] = useState(filters.map(() => []))

  const toggleFilter = index => {
    setOpenStates(prevStates =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    )
  }

  const handleCheckboxChange = (filterIndex, subLabel) => {
    setSelectedFilters(prevFilters =>
      prevFilters.map((filter, idx) =>
        idx === filterIndex
          ? filter.includes(subLabel)
            ? filter.filter(item => item !== subLabel)
            : [...filter, subLabel]
          : filter
      )
    )
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <img
          src={poster}
          alt='poster'
          className='w-full h-[200px] object-cover' // You can adjust the height as needed
        />
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[50px] font-bold'>
          {category}
        </h1>
      </div>

      {/* products list */}
      <div className='flex flex-col justify-center items-center p-4 md:px-20 md:pb-20'>
        {/* filter section */}
        <div className='flex w-full  justify-between mb-2 gap-2'>
          <div className='border w-1/4 h-fit'>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component='nav'
              aria-labelledby='nested-list-subheader'
              subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                  Filter by:
                </ListSubheader>
              }
            >
              {filters.map((filter, index) => (
                <div key={index}>
                  <ListItemButton onClick={() => toggleFilter(index)}>
                      <ListItemText className='font-semibold' primary={filter.label} />
                    {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openStates[index]} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {filter.subLabels.map((subLabel, subIndex) => (
                        <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                          <Checkbox
                            defaultChecked
                            color='default'
                            checked={selectedFilters[index].includes(subLabel)}
                            onChange={() =>
                              handleCheckboxChange(index, subLabel)
                            }
                          />
                          <ListItemText primary={subLabel} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          </div>
          <div className='flex flex-col w-3/4'>
            <div className='w-full mb-2 flex justify-between items-center'>
              <div className='text-lg'>
                <span className='font-semibold'>{products.length} </span>
                products
              </div>

              <select className='p-2 bg-gray-100 border'>
                <option>Availability</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
              </select>
            </div>
            <ProductList
              products={products}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shopping
