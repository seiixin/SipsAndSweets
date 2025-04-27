import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialCart = location.state?.cart || [];
    const [cart, setCart] = useState(initialCart);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);
    };

    const handleOrderToDelivery = async () => {
        if (!name || !contact || !address || !paymentMethod) {
            alert('Please fill out all fields before submitting the order.');
            return;
        }

        const orderData = {
            name,
            contact,
            address,
            payment_method: paymentMethod,
            total: calculateTotal(),
            items: cart,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData);
            alert(response.data.message);
            navigate('/receipt', { state: { cart, orderData } });
        } catch (error) {
            console.error('Error placing order: ', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const handleViewReceipt = () => {
        navigate('/receipt', { state: { cart } });
    };

    const handleAddMoreProducts = () => {
        navigate('/menu', { state: { cart } }); // Pass current cart
    };

    const handleReturnToPage = () => {
        navigate('/');
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
        setCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if ((updatedCart[index].quantity || 1) > 1) {
            updatedCart[index].quantity -= 1;
            setCart(updatedCart);
        }
    };

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-pink-700 mb-6">Order Summary</h1>

            {/* Customer Info Form */}
            <div className="space-y-4 mb-8">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="contact" className="font-semibold">Contact Number</label>
                    <input
                        type="text"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address" className="font-semibold">Delivery Address</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="paymentMethod" className="font-semibold">Payment Method</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-8">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p>{item.description}</p>
                            <p className="font-bold text-pink-700">₱{item.price}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-2 space-x-4">
                                <button
                                    onClick={() => decreaseQuantity(index)}
                                    className="bg-pink-500 text-white px-3 py-1 rounded-md"
                                >-</button>

                                <span>{item.quantity || 1}</span>

                                <button
                                    onClick={() => increaseQuantity(index)}
                                    className="bg-pink-500 text-white px-3 py-1 rounded-md"
                                >+</button>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md ml-4"
                                >Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Total Price */}
            <div className="text-right font-bold text-lg text-pink-700 mb-4">
                Total: ₱{calculateTotal()}
            </div>

            {/* Order Button */}
            <div className="text-center mt-8">
                <button
                    onClick={handleOrderToDelivery}
                    className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600"
                >
                    Order to Delivery
                </button>
            </div>

            {/* Final Options */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button
                    onClick={handleViewReceipt}
                    className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600"
                >
                    View Receipt
                </button>
            </div>

            {/* Add More Products Button */}
            <div className="text-center mt-8">
                <button
                    onClick={handleAddMoreProducts}
                    className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600"
                >
                    Add More Products
                </button>
            </div>

            {/* Return to Page Button */}
            <div className="text-center mt-8">
                <button
                    onClick={handleReturnToPage}
                    className="bg-white text-pink-500 border-2 border-pink-500 px-6 py-3 rounded-full shadow-md hover:bg-pink-500 hover:text-white"
                >
                    Return to Page
                </button>
            </div>
        </div>
    );
};

export default OrderPage;
