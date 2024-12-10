import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductsAPI from '../api/ProductsAPI'
import ProductList from '../components/admin/product/ProductList'
import AddProduct from '../components/admin/product/AddProduct'
import { formatCurrency } from '../utils/formatCurrency'  

const Product = () => {
  // useState
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])

  
  const fetchProducts = async () => {
    try {
      const response = await ProductsAPI.getAllProducts()
      if (response.success) {

        setProducts(response.data || []) // Default to an empty array
      } else {
        console.log('fetch product', response.data)
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  //  Fetching products
  useEffect(() => {
    
    fetchProducts()
  }, [])

  const handleAddProduct = async (formData) => {
    try {
      const response = await ProductsAPI.addProduct(formData)
      if (response.success) {
        fetchProducts()        
        setOpen(false)
        toast.success('Product added successfully!')
      } else {
        toast.error(response.message || 'Failed to add product.')
      }
      // reload automatically

    } catch (error) {
      console.log('error', error)
      toast.error(error.response?.data?.message || 'An error occurred while adding the product.')
    }
  }

  return (
    <div className='p-3'>
      <div className='w-full mb-2 flex justify-between'>
        <span className=' text-[30px] font-semibold  '>Product Management</span>
        <button
          className='bg-black text-white border hover:bg-white hover:text-black transition-all duration-300 rounded-md py-1 px-3 mr-3 '
          onClick={() => setOpen(true)}
        >
          Add Product
        </button>
        <AddProduct
          open={open}
          onClose={() => setOpen(false)}
          onAdd={handleAddProduct}
        />
      </div>
      <table className='text-left bg-white rounded-md w-full pr-[20px]'>
        <thead>
          <tr>
            <th scope='col' className='px-4 py-2 text-[14px]'>
              Thumbnails
            </th>
            <th scope='col' className='px-4 py-2 text-[14px]'>
              Name
            </th>
            <th scope='col' className='px-4 py-2 text-[14px]'>
              Price
            </th>
            <th scope='col' className='px-4 py-2 text-[14px]'>
              Tags
            </th>
            <th scope='col' className='px-4 py-2 text-[14px]'>
              Category
            </th>

            <th scope='col' className='px-4 py-2 text-[14px]'>
              Action
            </th>
          </tr>
        </thead>

        <ProductList products={products} setProducts={setProducts} fetchProducts={fetchProducts}/>
      </table>
    </div>
  )
}

export default Product
