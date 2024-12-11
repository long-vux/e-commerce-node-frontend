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
import CircularProgress from '@mui/material/CircularProgress'
import { Drawer, IconButton } from '@mui/material'
import { FilterList } from '@mui/icons-material'

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

  // Off-canvas filter state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductsAPI.getAllProducts();
        if (response.success) {
          const allProducts = response.data || [];
          const filteredProducts = category
            ? allProducts.filter(product => product.category === category)
            : [];
          setProducts(filteredProducts);
          console.log('Filtered products: ', filteredProducts);
        } else {
          setError('Failed to fetch products.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category]);
  
  // Extract unique tags from products
  const uniqueTags = Array.from(
    new Set(products.flatMap(product => product.tags || []))
  )

  // Extract unique sizes and colors from the parsed variants
  const uniqueSizes = Array.from(
    new Set(
      products.flatMap(
        product => product.variants?.map(variant => variant.size || '') || []
      )
    )
  )

  const uniqueColors = Array.from(
    new Set(
      products.flatMap(
        product => product.variants?.map(variant => variant.color || '') || []
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
subLabels: ['Under 100.000VND', '100.000VND - 500.000VND', '500.000VND - 1.000.000VND', 'Over 1.000.000VND']
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

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <CircularProgress />
      </div>
    )
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
            const color = variant.color
            return color === selected
          })
        )

      const matchesSize =
        selectedFilters[3].length === 0 ||
        selectedFilters[3].some(selected =>
          product.variants?.some(variant => {
            const size = variant.size
            return size === selected
          })
        )

      const matchesPrice =
        selectedFilters[1].length === 0 ||
        selectedFilters[1].some(selected => {
          if (selected === 'Under 100.000VND') return product.price < 100000
          if (selected === '100.000VND - 500.000VND')
            return product.price >= 100000 && product.price <= 500000
          if (selected === '500.000VND - 1.000.000VND')
            return product.price > 500000 && product.price <= 1000000
          if (selected === 'Over 1.000.000VND') return product.price > 1000000
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

  // Off-canvas filter drawer toggle
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen)
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
        <div className='flex w-full flex-col md:flex-row justify-between mb-2 gap-2'>
          {/* On mobile size, show the filter icon */}
          <div className='md:hidden'>
            <IconButton
              onClick={toggleFilterDrawer}
              color='primary'
              aria-label='Filter'
            >
              <FilterList fontSize='large' />
            </IconButton>
          </div>

          {/* Filter section for larger screens */}
          <div className='hidden md:block border w-1/4 h-fit'>
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

          {/* Products and sorting section */}
          <div className='flex flex-col w-full md:w-3/4'>
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

        {/* Off-canvas Filter Drawer for mobile */}
        <Drawer
          anchor='left'
          open={filterDrawerOpen}
          onClose={toggleFilterDrawer}
          sx={{
            width: '250px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '250px',
              boxSizing: 'border-box'
            }
          }}
        >
          <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Filter by:</h2>
            <List sx={{ width: '100%' }} component='nav'>
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
        </Drawer>
      </div>
    </div>
  )
}

export default Shopping
