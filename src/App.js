import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';  // Import the AppProvider
import MainRoutes from './routes/MainRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <div className="App">
      <AppProvider> {/* Wrap with AppProvider */}
        <Router>
          <Routes>
            <Route path="/*" element={<MainRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
