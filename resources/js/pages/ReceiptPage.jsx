import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const ReceiptPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart } = location.state || {};  // Get the cart data passed from OrderPage

    // Calculate total price
    const calculateTotal = () => {
        return cart?.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);
    };

    // Handle generating the receipt as an image
    const handleDownloadReceipt = () => {
        const receiptElement = document.getElementById('receipt');
        html2canvas(receiptElement).then((canvas) => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'receipt.png';
            link.click();
        });
    };

    // Handle returning to the Order Page
    const handleReturnToOrderPage = () => {
        navigate('/order'); // Navigate back to the OrderPage
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-pink-700 mb-6">Order Receipt</h1>

            {/* Receipt Section */}
            <div id="receipt" className="bg-pink-500 text-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white">Order Receipt</h2>
                <div className="mt-4">
                    <h3 className="font-semibold">Items Purchased:</h3>
                    {cart?.map((item, index) => (
                        <p key={index} className="text-white">
                            {item.name} x{item.quantity || 1} - ₱{(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                    ))}
                    <h3 className="mt-4 font-semibold">Total: ₱{calculateTotal()}</h3>
                    <p className="mt-2">Thank you for your purchase! Visit us again soon!</p>
                </div>
            </div>

            {/* Final Options */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button
                    onClick={handleDownloadReceipt}
                    className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600"
                >
                    Download Receipt
                </button>
            </div>
        </div>
    );
};

export default ReceiptPage;
