// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="p-4 bg-pink-100">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-gray-800 hover:text-pink-600 transition">Home</Link>
        </li>
        <li>
          <Link to="/order" className="text-gray-800 hover:text-pink-600 transition">Order</Link>
        </li>
        <li>
          <Link to="/adminPage" className="text-gray-800 hover:text-pink-600 transition">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
