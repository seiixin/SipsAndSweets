<?php

// app/Http/Controllers/OrderController.php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Log incoming request data
            Log::info('Placing order:', $request->all());

            // Validate the request data
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'contact' => 'required|string|max:15',
                'address' => 'required|string',
                'payment_method' => 'required|string',
                'total' => 'required|numeric',
                'items' => 'required|array',
            ]);

            // Create a new order in the database
            $order = Order::create([
                'name' => $validated['name'],
                'contact' => $validated['contact'],
                'address' => $validated['address'],
                'payment_method' => $validated['payment_method'],
                'total' => $validated['total'],
                'items' => json_encode($validated['items']),
            ]);

            // Log the order data after creation
            Log::info('Order placed successfully:', $order->toArray());

            // Return a success response with the order data
            return response()->json([
                'message' => 'Order placed successfully!',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            // Log the error message if something goes wrong
            Log::error('Error placing order: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'An error occurred while placing the order. Please try again later.',
                'exception' => $e->getMessage()  // Send the exception message for debugging purposes
            ], 500);
        }
    }

    public function index()
    {
        try {
            // Fetch all orders
            $orders = Order::all();

            // Return orders as a JSON response
            return response()->json($orders, 200);

        } catch (\Exception $e) {
            // Log the error message if something goes wrong
            Log::error('Error fetching orders: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'An error occurred while fetching orders. Please try again later.',
                'exception' => $e->getMessage()  // Send the exception message for debugging purposes
            ], 500);
        }
    }
    /**
     * Update the order status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'status' => 'required|string|in:Pending,Done,Canceled',
            ]);

            // Find the order
            $order = Order::findOrFail($id);

            // Update the status
            $order->status = $validated['status'];
            $order->save();

            // Return a success response
            return response()->json([
                'message' => 'Order status updated successfully',
                'order' => $order
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Order not found'
            ], 404);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating order status: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'An error occurred while updating order status',
                'exception' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified order from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        try {
            // Find the order
            $order = Order::findOrFail($id);

            // Delete the order
            $order->delete();

            // Return a success response
            return response()->json([
                'message' => 'Order deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Order not found'
            ], 404);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error deleting order: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'An error occurred while deleting the order',
                'exception' => $e->getMessage()
            ], 500);
        }
    }
}
