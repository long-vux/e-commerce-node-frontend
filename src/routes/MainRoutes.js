import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
import Cart from '../pages/Cart';
import LoginSignup from '../pages/LoginSignup';
// import ErrorPage from '../pages/ErrorPage';
import ChangePassword from '../pages/ChangePassword'
import RecoverPassword from '../pages/RecoverPassword'
import Shopping from '../pages/Shopping';
import ProductDetail from '../pages/ProductDetail';

const MainRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/recover-password/:userId/:token" element={<RecoverPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/category/:category" element={<Shopping/>} />
      <Route path="/:userId/verify/:token" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} /> 
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
  </>
)

export default MainRoutes;