import React, { useEffect, useState } from 'react'
import poster from '../assets/images/poster.png'
import { useParams } from 'react-router-dom'
import ProductList from '../components/Products/ProductList'
import ProductsAPI from '../api/ProductsAPI'

// LIST ITEMS
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'

const Shopping = () => {
  const { category } = useParams()

  // GET ALL PRODUCTS
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOption, setSortOption] = useState('Availability') // State for sort option

  // LIST COLLAPSE
  const [openStates, setOpenStates] = useState([]) // Initialize as empty
  const [selectedFilters, setSelectedFilters] = useState([]) // Initialize as empty

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await ProductsAPI.getAllProducts()
        if (response.success) {
          setProducts(response.data || []) // Default to an empty array
          console.log('Fetched products: ', response.data)
        } else {
          setError('Failed to fetch products.')
        }
      } catch (err) {
        setError(err.message || 'Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])
  const parseVariantDetails = (name) => {
    const [size, color] = name.split(' - ');
    return { size, color };
  };

  // Extract unique tags from products
  const uniqueTags = Array.from(
    new Set(products.flatMap(product => product.tags || []))
  )

  // Extract unique sizes and colors from the parsed variants
  const uniqueSizes = Array.from(
    new Set(
      products.flatMap(
        product =>
          product.variants?.map(
            variant => parseVariantDetails(variant.name).size
          ) || []
      )
    )
  )

  const uniqueColors = Array.from(
    new Set(
      products.flatMap(
        product =>
          product.variants?.map(
            variant => parseVariantDetails(variant.name).color
          ) || []
      )
    )
  )



  // Define filters based on unique values
  const filters = [
    {
      label: 'Tags', // Changed from 'Category' to 'Tags'
      subLabels: uniqueTags.length > 0 ? uniqueTags : ['No tags available']
    },
    {
      label: 'Price Range',
      subLabels: ['Under $20', '$20 - $50', '$50 - $100', 'Over $100']
    },
    {
      label: 'Color',
      subLabels:
        uniqueColors.length > 0 ? uniqueColors : ['No colors available']
    },
    {
      label: 'Size',
      subLabels: uniqueSizes.length > 0 ? uniqueSizes : ['No sizes available']
    }
  ]

  // Initialize openStates and selectedFilters based on the number of filters
  useEffect(() => {
    setOpenStates(new Array(filters.length).fill(false))
    setSelectedFilters(new Array(filters.length).fill([])) // Initialize with empty arrays
  }, [filters.length])

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  const handleAddToCart = id => {
    console.log(`Added product with id ${id} to cart`)
  }

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
  // Adjust the filterProducts function to handle tags
  const filterProducts = () => {
    return products.filter(product => {
      const matchesTags =
        selectedFilters[0].length === 0 ||
        selectedFilters[0].some(tag => product.tags?.includes(tag)) // Match tags

      const matchesColor =
        selectedFilters[2].length === 0 ||
        selectedFilters[2].some(selected =>
          product.variants?.some(variant => {
            const { color } = parseVariantDetails(variant.name)
            return color === selected
          })
        )

      const matchesSize =
        selectedFilters[3].length === 0 ||
        selectedFilters[3].some(selected =>
          product.variants?.some(variant => {
            const { size } = parseVariantDetails(variant.name)
            return size === selected
          })
        )

      const matchesPrice =
        selectedFilters[1].length === 0 ||
        selectedFilters[1].some(selected => {
          if (selected === 'Under $20') return product.price < 20
          if (selected === '$20 - $50')
            return product.price >= 20 && product.price <= 50
          if (selected === '$50 - $100')
            return product.price > 50 && product.price <= 100
          if (selected === 'Over $100') return product.price > 100
          return false
        })

      return matchesTags && matchesColor && matchesSize && matchesPrice
    })
  }

  // Sorting function
  const sortedProducts = () => {
    switch (sortOption) {
      case 'Price, low to high':
        return [...filterProducts()].sort((a, b) => a.price - b.price)
      case 'Price, high to low':
        return [...filterProducts()].sort((a, b) => b.price - a.price)
      default:
        return filterProducts() // Default to filtered products
    }
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <img
          src={poster}
          alt='poster'
          className='w-full h-[200px] object-cover'
        />
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[50px] font-bold'>
          {category}
        </h1>
      </div>

      {/* products list */}
      <div className='flex flex-col justify-center items-center p-4 md:px-20 md:pb-20'>
        {/* filter section */}
        <div className='flex w-full justify-between mb-2 gap-2'>
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
                    <ListItemText
                      className='font-semibold'
                      primary={filter.label}
                    />
                    {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openStates[index]} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {filter.subLabels.map((subLabel, subIndex) => (
                        <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                          <Checkbox
                            color='default'
                            checked={selectedFilters[index]?.includes(subLabel)}
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
                <span className='font-semibold'>
                  {sortedProducts().length}{' '}
                </span>
                products
              </div>

              {/* handle sort based on products */}
              <select
                className='p-2 bg-gray-100 border'
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
              >
                <option>Availability</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
              </select>
            </div>

            <ProductList
              products={sortedProducts()} // Use sorted and filtered products
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shopping
