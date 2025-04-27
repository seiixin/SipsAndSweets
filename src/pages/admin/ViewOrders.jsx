import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('status'); // Default sort by status
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/orders');

      // Process orders to ensure items is always a valid array
      const processedOrders = response.data.map(order => {
        let parsedItems = [];

        // If items is a string, try to parse it
        if (typeof order.items === 'string') {
          try {
            parsedItems = JSON.parse(order.items);
          } catch (error) {
            console.error(`Error parsing items for order ${order.id}:`, error);
          }
        }
        // If items is already an array, use it directly
        else if (Array.isArray(order.items)) {
          parsedItems = order.items;
        }

        // Return the order with properly formatted items
        return {
          ...order,
          items: parsedItems
        };
      });

      // Calculate total income from completed orders
      const completedTotal = processedOrders
        .filter(order => order.status?.toLowerCase() === 'done')
        .reduce((sum, order) => sum + parseFloat(order.total || 0), 0);

      setTotalIncome(completedTotal);
      setOrders(processedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle marking an order as done
  const handleMarkAsDone = async (orderId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/status`, {
        status: 'Done'
      });

      // Update the local state without fetching all orders again
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: 'Done' }
            : order
        )
      );

      // Update total income
      const completedOrder = orders.find(order => order.id === orderId);
      if (completedOrder) {
        setTotalIncome(prev => prev + parseFloat(completedOrder.total || 0));
      }

      alert('Order marked as done!');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Handle deleting an order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}`);

      // Remove the order from local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  // Helper function to check if an order is pending (case-insensitive)
  const isPending = (status) => {
    if (!status) return true; // No status means pending
    return status.toLowerCase() === 'pending';
  };

  // Sort orders with pending first, then done
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === 'status') {
      // Pending orders first
      if (isPending(a.status) && !isPending(b.status)) return -1;
      if (!isPending(a.status) && isPending(b.status)) return 1;
      return 0;
    } else if (sortBy === 'date') {
      // Most recent first
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'amount') {
      // Highest amount first
      return parseFloat(b.total || 0) - parseFloat(a.total || 0);
    }
    return 0;
  });

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">All Orders</h1>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="sortBy" className="mr-2">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1"
          >
            <option value="status">Status (Pending First)</option>
            <option value="date">Date (Newest First)</option>
            <option value="amount">Amount (Highest First)</option>
          </select>
        </div>
        <div className="text-xl font-bold">
          Total Income: ₱{totalIncome.toFixed(2)}
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className={`border p-4 rounded-lg shadow-md ${
                isPending(order.status)
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-green-400 bg-green-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{order.name}</h2>
                  <p>Contact: {order.contact}</p>
                  <p>Address: {order.address}</p>
                  <p>Payment Method: {order.payment_method}</p>
                  <p>Total: ₱{parseFloat(order.total).toFixed(2)}</p>
                  <p>Status: <span className={`font-bold ${isPending(order.status) ? 'text-orange-600' : 'text-green-600'}`}>
                    {order.status || 'Pending'}
                  </span></p>
                  <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  {/* Always display the Done button for pending orders - case insensitive */}
                  {isPending(order.status) && (
                    <button
                    onClick={() => handleMarkAsDone(order.id)}
                    className="bg-[#f652a0] hover:bg-[#f652a0] text-white py-1 px-4 rounded block w-full"
                    >
                    Mark as Done
                    </button>
                  )}
                    <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-white border-2 border-[#f652a0] text-[#f652a0] hover:bg-[#ffe5ec] py-1 px-4 rounded block w-full"
                    >
                    Delete
                    </button>

                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium">Order Items:</p>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  <ul className="list-disc pl-5 mt-1">
                    {order.items.map((item, index) => (
                      <li key={item.id || `item-${index}`}>
                        {item.name || 'Unnamed Item'}
                        {item.quantity && ` x${item.quantity}`}
                        {item.price && ` - ₱${parseFloat(item.price * (item.quantity || 1)).toFixed(2)}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-gray-500">No items found</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
