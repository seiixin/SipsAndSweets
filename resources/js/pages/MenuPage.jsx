import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState(location.state?.cart || []); // Updated

    const categories = ['All', 'Drink', 'Dessert', 'Combo'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/menu');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let updated = products;

        if (selectedCategory !== 'All') {
            updated = updated.filter(p => p.category === selectedCategory);
        }

        if (searchQuery.trim() !== '') {
            updated = updated.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updated);
    }, [searchQuery, selectedCategory, products]);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                // Product is already in the cart, increase the quantity
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // Product is not in the cart, add it with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };


    const handleOrderNow = () => {
        navigate('/order', { state: { cart } });
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-pink-700 mb-6">Menu</h1>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search for something sweet..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border-2 border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200
                            ${selectedCategory === category
                                ? 'bg-pink-500 text-white shadow-md'
                                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded mb-3"
                            />
                            <h2 className="text-xl font-semibold text-pink-600">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="mt-2 text-pink-700 font-bold">₱{product.price}</p>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No products found.
                    </p>
                )}
            </div>

            {/* Floating "Order Now" Button */}
            <button
                onClick={handleOrderNow}
                className="fixed bottom-4 right-4 bg-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-pink-600"
            >
                🛒 Order Now ({cart.length})
            </button>
        </div>
    );
};

export default MenuPage;
