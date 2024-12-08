import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersCompleted, setOrdersCompleted] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [storeVisits, setStoreVisits] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchMockData = async () => {
      const mockRevenue = 8792;
      setTotalRevenue(mockRevenue);
      setOrdersCompleted(1740);
      setTotalSales(5212);
      setStoreVisits(2.5);
      setTotalOrders(3000); // Mock total orders

      const mockTopProducts = [
        { name: 'Product A', date: 'December 12, 2020', sales: '$1,200', stock: '17' },
        { name: 'Product B', date: 'January 28, 2021', sales: '$899', stock: '25' },
        { name: 'Product C', date: 'March 23, 2021', sales: '$899', stock: '32' },
      ];
      setTopProducts(mockTopProducts);

      const mockOrdersData = [
        { date: '2024-12-01', total: 1000 },
        { date: '2024-12-02', total: 1200 },
        { date: '2024-12-03', total: 1100 },
        { date: '2024-12-04', total: 900 },
        { date: '2024-12-05', total: 1500 },
      ];
      setOrdersData(mockOrdersData);
    };

    fetchMockData();
  }, []);

  const chartData = {
    labels: ordersData.map(order => order.date),
    datasets: [
      {
        label: 'Revenue ($)',
        data: ordersData.map(order => order.total),
        borderColor: 'black',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ['Completed Orders', 'Pending Orders'],
    datasets: [
      {
        data: [ordersCompleted, 500], // Mocked pending orders
        backgroundColor: ['black', '#ddd'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', color: '#000' }}>
      <Grid container spacing={3}>
        {/* Total Revenue Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Revenue</Typography>
              <Typography variant="h4" color="textPrimary">${totalRevenue}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Completed Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Orders Completed</Typography>
              <Typography variant="h4" color="textPrimary">{ordersCompleted}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Sales Made Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Sales Made</Typography>
              <Typography variant="h4" color="textPrimary">{totalSales}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Orders Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Orders</Typography>
              <Typography variant="h4" color="textPrimary">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Over Time Chart */}
        <Grid item xs={12} sm={12} md={8}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <CardContent>
              <Typography variant="h6">Revenue Over Time</Typography>
              <Line data={chartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products - Full Height */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 1, backgroundColor: '#fff', border: '1px solid #ddd', height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6">Top Products</Typography>
              <Box sx={{ overflowY: 'auto', flex: 1 }}>
                {topProducts.map((product, index) => (
                  <Box key={index} sx={{ mb: 2, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                    <Typography variant="caption" color="textSecondary">Date: {product.date}</Typography>
                    <Typography variant="body2">Sales: {product.sales}</Typography>
                    <Typography variant="body2">Stock: {product.stock}</Typography>
                    <Chip label="In Stock" color="success" size="small" sx={{ mt: 1 }} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
