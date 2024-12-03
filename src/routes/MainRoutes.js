import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
import Cart from '../pages/Cart';
import LoginSignup from '../pages/LoginSignup';
// import ErrorPage from '../pages/ErrorPage';
import ChangePassword from '../pages/ChangePassword'
import Shopping from '../pages/Shopping';
const MainRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/:category" element={<Shopping/>} />
      <Route path="/" element={<Home />} />
      <Route path="/verify-email/:userId/:token" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} /> 
    </Routes>
    <Footer />
  </>
)

export default MainRoutes;