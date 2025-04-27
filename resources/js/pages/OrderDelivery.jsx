// resources/js/components/OrderDelivery.jsx
import React, { useState } from 'react';
import axios from 'axios';

const OrderDelivery = () => {
  // State to manage form data
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);

  // Handle the form submission to place the order
  const handleOrderToDelivery = async () => {
    const orderData = {
      name: name,
      contact: contact,
      address: address,
      payment_method: paymentMethod,
      total: total,
      items: JSON.stringify(items), // Convert items array to JSON string
    };

    try {
      // POST request to place the order
      const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData);
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      {/* Form inputs for order details */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} placeholder="Payment Method" />
      <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total" />

      {/* You can add a cart or items logic here */}
      <button onClick={handleOrderToDelivery}>Place Order</button>
    </div>
  );
};

export default OrderDelivery;
