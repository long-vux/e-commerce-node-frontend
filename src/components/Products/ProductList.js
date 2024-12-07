import React, { useState } from 'react'
import ProductCard from './ProductCard'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function ProductList ({ products = [] }) {
  const [page, setPage] = useState(1)
  const productsPerPage = 12

  // Determine the products for the current page
  const startIndex = (page - 1) * productsPerPage
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Total pages calculation
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Product Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard key={product._id || index} product={product} />
          ))
        ) : (
          <p className='col-span-4 text-center text-gray-500'>
            No products available.
          </p>
        )}
      </div>  
      
      
      {/* Pagination */}
      <Stack spacing={2} className='flex justify-center'>
        <Pagination
          count={totalPages}
          page={page}
          size="large"
          onChange={handleChangePage}
          renderItem={item => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  )
}

export default ProductList
