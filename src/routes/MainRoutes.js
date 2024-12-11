import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Profile from '../pages/Profile'
import VerifyEmail from '../pages/VerifyEmail'
import Cart from '../pages/Cart'
import LoginSignup from '../pages/LoginSignup'
import ErrorPage from '../pages/ErrorPage.jsx';
import ChangePassword from '../pages/ChangePassword'
import RecoverPassword from '../pages/RecoverPassword'
import OrderDetails from '../pages/OrderDetail'
import Shopping from '../pages/Shopping'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'
import HistoryPurchase from '../pages/HistoryPurchase'
import Success from '../pages/Success'

const MainRoutes = () => (
  <div className='overflow-x-hidden'>
    <Header />
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/recover-password/:userId/:token" element={<RecoverPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/category/:category" element={<Shopping />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path='cart/checkout' element={<Checkout />} />
      <Route path='/verify-email/:userId/:token' element={<VerifyEmail />} />
      <Route path='/history-purchase' element={<HistoryPurchase />} />
      <Route path='/order-details/:orderId' element={<OrderDetails />} />
      <Route path='/success' element={<Success />} />

      <Route path='/' element={<Home />} />
      {/* Add a fallback route for unknown paths */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer />
  </div>
)

export default MainRoutes
