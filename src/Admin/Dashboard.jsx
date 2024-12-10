import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import axios from 'axios'
import { formatCurrency } from '../utils/formatCurrency'

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_API_URL

  const [totalRevenue, setTotalRevenue] = useState(0)
  const [ordersCompleted, setOrdersCompleted] = useState(0)
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [topProducts, setTopProducts] = useState([])
  const [ordersData, setOrdersData] = useState([])


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total revenue
        const revenueResponse = await axios.get(`${BASE_URL}api/admin/revenue`)
        setTotalRevenue(revenueResponse.data.data[0]?.total || 0)

        // Fetch completed orders
        const completedOrdersResponse = await axios.get(
          `${BASE_URL}api/admin/completed-orders`
        )
        setOrdersCompleted(completedOrdersResponse.data.data)

        // Fetch total users
        const usersResponse = await axios.get(
          `${BASE_URL}api/admin/number-of-users`
        )
        setNumberOfUsers(usersResponse.data.data)

        // Fetch total orders
        const ordersResponse = await axios.get(
          `${BASE_URL}api/admin/get-all-orders`
        )
        setTotalOrders(ordersResponse.data.total)

        // Fetch revenue by month
        const revenueByMonthResponse = await axios.get(
          `${BASE_URL}api/admin/revenue-by-month`
        )
        const ordersDataFormatted = revenueByMonthResponse.data.data.map(
          item => ({
            date: `Month ${item._id.month}`,
            total: item.total
          })
        )
        setOrdersData(ordersDataFormatted)

        // Fetch top products
        const topProductsResponse = await axios.get(
          `${BASE_URL}api/product/best-selling-products`
        )
        setTopProducts(topProductsResponse.data.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData(topProducts)
  }, [])


  console.log()
  const chartData = {
    labels: ordersData.map(order => order.date),
    datasets: [
      {
        label: 'Revenue ($)',
        data: ordersData.map(order => order.total),
        borderColor: 'black',
        fill: false,
        tension: 0.4
      }
    ]
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', color: '#000' }}>
      <Grid container spacing={3}>
        {/* Total Revenue Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd'
            }}
          >
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Total Revenue
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {formatCurrency(totalRevenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Completed Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd'
            }}
          >
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Orders Completed
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {ordersCompleted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Number of Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd'
            }}
          >
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Number of Users
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {numberOfUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Orders Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd'
            }}
          >
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Total Orders
              </Typography>
              <Typography variant='h4' color='textPrimary'>
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Over Time Chart */}
        <Grid item xs={12} sm={12} md={8}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd'
            }}
          >
            <CardContent>
              <Typography variant='h6'>Revenue Over Time</Typography>
              <Line data={chartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products - Full Height */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              height: '100%'
            }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Typography variant='h6'>Top Products</Typography>
              <Box sx={{ overflowY: 'auto', flex: 1 }}>
                {topProducts.map((product, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 2, borderBottom: '1px solid #ddd' }}
                  >
                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                   
                    <Typography variant='body2'>
                      Total Sold: {product.totalSold || 0}
                    </Typography>
                  
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
