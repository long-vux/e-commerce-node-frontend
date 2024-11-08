import React from 'react';
import { Link } from 'react-router-dom';
// import ProductList from '../components/Products/ProductList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      {/* <ProductList /> */}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
