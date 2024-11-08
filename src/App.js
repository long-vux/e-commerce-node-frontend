import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';  // Import the AppProvider
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App">
      <AppProvider> {/* Wrap with AppProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
