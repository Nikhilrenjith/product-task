import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}/carts`);
        if (response.ok) {
          const data = await response.json();
          setCartData(data.carts[0]); // Assuming there's only one cart for the user
          console.log(data);
        } else {
          console.error("Failed to fetch user's cart data:", response.status);
        }
      } catch (error) {
        console.error("Error during user's cart data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCart();
  }, [id]);

  return (
    <div>
      <h1>Cart for User ID: {id}</h1>
      {loading ? (
        <p>Loading cart data...</p>
      ) : cartData ? (
        <div>
          <p>Total: ${cartData.total}</p>
          <p>Discounted Total: ${cartData.discountedTotal}</p>
          <p>Total Products: {cartData.totalProducts}</p>
          <p>Total Quantity: {cartData.totalQuantity}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Products:</h3>
          <ul>
            {cartData.products.map((product) => (
              <li key={product.id}>
                <p>Title: {product.title}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No cart data available for the user.</p>
      )}
    </div>
  );
};

export default Cart;
