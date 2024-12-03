import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
import Cart from '../pages/Cart';
<<<<<<< HEAD
import LoginSignup from '../pages/LoginSignup';
=======
import ChangePassword from '../pages/ChangePassword';
>>>>>>> 3fd7ebfcc3ae14522913237ed782c515493e1551
// import ErrorPage from '../pages/ErrorPage';

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