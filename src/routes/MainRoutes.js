import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
import Cart from '../pages/Cart';
import LoginSignup from '../pages/LoginSignup';
<<<<<<< HEAD
// import ErrorPage from '../pages/ErrorPage';
import ChangePassword from '../pages/ChangePassword'
import Shopping from '../pages/Shopping';
=======
import ChangePassword from '../pages/ChangePassword';

>>>>>>> 4096e2f9711bb5870d21a1685dee58766a04a9b5
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
<<<<<<< HEAD
      <Route path="/verify-email/:userId/:token" element={<VerifyEmail />} />
=======
      <Route path="/cart" element={<Cart />} />
      <Route path="/:userId/verify/:token" element={<VerifyEmail />} />
>>>>>>> 4096e2f9711bb5870d21a1685dee58766a04a9b5
      <Route path="/change-password" element={<ChangePassword />} /> 
    </Routes>
    <Footer />
  </>
)

export default MainRoutes;