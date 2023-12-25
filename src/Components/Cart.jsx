import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const { id } = useParams();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}/carts`);
        if (response.ok) {
          const data = await response.json();
          setCartData(data.carts[0]);
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
      <Navbar cartCount={cartData ? cartData.totalQuantity : 0} />
      {loading ? (
        <p>Loading cart data...</p>
      ) : cartData ? (
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{`${cartData.totalProducts} Items`}</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {cartData.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={product.thumbnail}
                        alt={product.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{product.title}</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <div className="text-gray-600 w-3">-</div>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={product.quantity}
                    />
                    <div className="text-gray-600 w-3">+</div>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">{`$${product.price}.00`}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">{`$${product.total}.00`}</span>
                </div>
              ))}

              <a
                href={`/homepage/${id}`}
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <div className="text-indigo-600 w-4">&#8249;</div>
                Continue Shopping
              </a>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">{`Items ${cartData.totalProducts}`}</span>
                <span className="font-semibold text-sm">{`$${cartData.total}`}</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $ 10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{`$ ${cartData.total + 10}`}</span>
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No cart data available for the user.</p>
      )}
    </div>
  );
};

export default Cart;
