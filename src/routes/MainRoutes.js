import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
import Cart from '../pages/Cart';
import LoginSignup from '../pages/LoginSignup';
import ChangePassword from '../pages/ChangePassword';

const MainRoutes = () => (
  <>
    <Header />
    <Routes>

      <Route path="/login" element={<LoginSignup />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/:userId/verify/:token" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} /> 
    </Routes>
    <Footer />
  </>
)

export default MainRoutes;