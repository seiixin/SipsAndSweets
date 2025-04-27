import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = ({ toggleMenu }) => {
    return (
        <header className="bg-pink-50 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <Logo size={42} />
                        <span className="ml-2 text-2xl font-semibold text-pink-600">Sips & Sweets</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 text-lg">
                    <Link to="/" className="text-gray-800 hover:text-pink-600 transition">Home</Link>
                    <Link to="/menu" className="text-gray-800 hover:text-pink-600 transition">Menu</Link>
                    <Link to="/about" className="text-gray-800 hover:text-pink-600 transition">About</Link>
                    <Link to="/contact" className="text-gray-800 hover:text-pink-600 transition">Contact</Link>
                    <Link to="/AdminPage" className="text-gray-800 hover:text-pink-600 transition">Login</Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-md text-gray-700 hover:bg-pink-100"
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
