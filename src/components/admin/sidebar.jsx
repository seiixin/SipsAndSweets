// src/components/admin/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-pink-500 p-4 text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>

      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="block p-3 text-lg hover:bg-pink-400 rounded-lg">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/manage-products" className="block p-3 text-lg hover:bg-pink-400 rounded-lg">Manage Products</Link>
        </li>
        <li>
          <Link to="/admin/view-orders" className="block p-3 text-lg hover:bg-pink-400 rounded-lg">View Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
