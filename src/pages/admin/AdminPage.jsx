import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State to manage the form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      console.log('Logging in with:', { username, password });
      // Perform authentication logic here
      // If authentication is successful, navigate to the dashboard
      navigate('/admin/dashboard');
    } else {
      console.log('Please fill in both fields');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          {/* Login Icon */}
          <div className="w-16 h-16 bg-pink-500 rounded-full flex justify-center items-center">
            <i className="text-white text-3xl">🔒</i>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-pink-500 hover:text-pink-600">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
