import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import VerifyEmail from '../pages/VerifyEmail';
// import ErrorPage from '../pages/ErrorPage';

const MainRoutes = () => (
  <>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="/:userId/verify/:token" element={<VerifyEmail />} />
    </Routes>
    <Footer />
  </>
)

export default MainRoutes;