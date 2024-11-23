import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Admin/Dashboard';

const AdminRoutes = () => (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
)

export default AdminRoutes;