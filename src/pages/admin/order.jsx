import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/orders'); // Changed to GET for fetching orders
        const updatedOrders = response.data.orders.map(order => {
          // Handle stringified items
          if (typeof order.items === 'string') {
            try {
              order.items = JSON.parse(order.items); // Parse if stringified
            } catch (error) {
              console.error('Error parsing items:', error);
              order.items = []; // Fallback to empty array if parsing fails
            }
          }
          return order;
        });
        setOrders(updatedOrders); // Update the state with parsed orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">All Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{order.name}</h2>
            <p>Contact: {order.contact}</p>
            <p>Address: {order.address}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Total: ₱{order.total}</p>
            <p>Items:
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <span key={index}>{item.name} (x{item.quantity || 1}), </span>
                ))
              ) : (
                <span>No items found</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
