import React, { useState, useEffect, useContext } from 'react'
import useAxios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../contexts/UserContext'
import ProductsAPI from '../api/ProductsAPI'
import ProductList from '../components/admin/product/ProductList'
import AddProduct from '../components/admin/product/AddProduct'
import { Button } from '@mui/material'

const Product = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const axios = useAxios()
  const navigate = useNavigate()
  const { user, login, logout } = useContext(UserContext)

  // useState
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])

  const handleAddProduct = newProduct => {
    setProducts([...products, newProduct])
    
  }
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  //  Fetching products
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



  return (
    <div>
      <div className='w-full mb-2 flex justify-between'>
        <span className=' text-[30px] font-semibold  '>Product</span>
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

        <ProductList products={products} />
      </table>
    </div>
  )
}

export default Product
