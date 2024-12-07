import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ProductRow from './ProductRow'
import ProductsAPI from '../../../api/ProductsAPI'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductList = ({ products, setProducts, fetchProducts }) => {
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


  const handleDelete = async (productId) => {
    try {
      const response = await ProductsAPI.deleteProduct(productId)
      if (response.success) {
        toast.success('Product deleted successfully!')
        setProducts(prevList =>
          prevList.filter(product => product._id !== productId)
        )
        console.log(`Product with ID ${productId} deleted`)
      } else {
        toast.error(response.message || 'Failed to delete product.')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEdit = async (productId, formData) => {
    try {
      const response = await ProductsAPI.updateProduct(productId, formData)
      console.log('response: ', response)
      if (response.success) {
        fetchProducts()
        toast.success('Product updated successfully!')
        setProducts(prevList =>
          prevList.map(product =>
            product._id === productId ? response.data : product
          )
        )
      } else {
        toast.error(response.message || 'Failed to update product.')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
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
              onEdit={(formData) => handleEdit(product._id, formData)}
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
