import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Profile from '../pages/Profile'
import VerifyEmail from '../pages/VerifyEmail'
import Cart from '../pages/Cart'
import LoginSignup from '../pages/LoginSignup'
// import ErrorPage from '../pages/ErrorPage';
import ChangePassword from '../pages/ChangePassword'
import Shopping from '../pages/Shopping'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'
const MainRoutes = () => (
  <div className='overflow-x-hidden'>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginSignup />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='cart/checkout' element={<Checkout />} />
      <Route
        path='/collection/:category/products/:id/:name'
        element={<ProductDetail />}
      />



      <Route path='/collection/:category' element={<Shopping />} />
      <Route path='/verify-email/:userId/:token' element={<VerifyEmail />} />
      <Route path='/change-password' element={<ChangePassword />} />
      {/* Add a fallback route for unknown paths */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
    <Footer />
  </div>
)

export default MainRoutes
