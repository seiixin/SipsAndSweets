import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';

// Public Pages
import Home from '../pages/Home';
import MenuPage from '../pages/MenuPage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import OrderPage from '../pages/OrderPage';
import ReceiptPage from '../pages/ReceiptPage';
import OrderDelivery from '../pages/OrderDelivery';

// Admin Layout
import AdminDashboard from '@src/pages/admin/AdminDashboard';
import AdminPage from '@src/pages/admin/AdminPage';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header toggleMenu={toggleMenu} />
                <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />

                <main className="flex-grow">
                    <Routes>
                        {/* Public Pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/receipt" element={<ReceiptPage />} />
                        <Route path="/OrderDelivery" element={<OrderDelivery />} />

                        {/* Admin Section */}
                        <Route path="/admin/*" element={<AdminDashboard />} />
                        <Route path="/AdminPage" element={<AdminPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
