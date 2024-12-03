import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';  // Import the AppProvider
import MainRoutes from './routes/MainRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <UserProvider> {/* Wrap with AppProvider */}
          <Router>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route path="/*" element={<MainRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </Router>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
