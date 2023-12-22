import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (response.ok) {
          const data = await response.json();

          // Log the structure of the fetched data
          console.log("Fetched Data Structure:", data);

          // Check if "products" key exists in the data
          if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
            console.log("Fetched Products:", data.products);
          } else {
            console.error("Invalid data format:", data);
          }
        } else {
          console.error("Error fetching products:", response.status);
        }
      } catch (error) {
        console.error("Error during product fetch:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Cards />
      <div>
        {products.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
