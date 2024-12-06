import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ProductRow from './ProductRow'

const ProductList = ({ products }) => {
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
   const [productList, setProductList] = useState(products);


  const handleDelete = productId => {
    // Logic to delete the product
    setProductList(prevList =>
      prevList.filter(product => product._id !== productId)
    )
    console.log(`Product with ID ${productId} deleted`)
  }

  const handleEdit = updatedProduct => {
    // Logic to update the product
    setProductList(prevList =>
      prevList.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    )
    console.log('Updated Product:', updatedProduct)
  }
  return (
    <>
      <tbody>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductRow
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className='col-span-4 text-center text-gray-500'>
            No products available.
          </p>
        )}
      </tbody>

      {/* Pagination */}
      <Stack spacing={2} className='flex justify-center'>
        <Pagination
          count={totalPages}
          page={page}
          size='large'
          onChange={handleChangePage}
          renderItem={item => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  )
}

export default ProductList
