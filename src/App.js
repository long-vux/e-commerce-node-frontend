import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';  // Import the AppProvider
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="App">
      <AppProvider> {/* Wrap with AppProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
