import { Link, Routes, Route } from 'react-router-dom';
import ViewOrders from './ViewOrders';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-500 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard" className="hover:bg-pink-600 p-3 rounded-lg">Dashboard</Link>
          <Link to="/admin/view-orders" className="hover:bg-pink-600 p-3 rounded-lg">View Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Routes>
          <Route path="dashboard" element={
            <div>
              <h2 className="text-3xl font-bold text-pink-600 mb-6">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600">Choose an action from the sidebar.</p>
            </div>
          } />
          <Route path="view-orders" element={<ViewOrders />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
