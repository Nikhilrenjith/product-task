import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";

const Homepage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.products && Array.isArray(data.products)) {
            setAllProducts(data.products);
            setSortedProducts(data.products);
            setLimit(20);
          } else {
            console.error("Invalid data format:", data);
          }
        } else {
          console.error("Error fetching all products:", response.status);
        }
      } catch (error) {
        console.error("Error during all products fetch:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    let sortedAndFilteredProducts = [...allProducts];

    if (searchTerm) {
      sortedAndFilteredProducts = sortedAndFilteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "highToLow") {
      sortedAndFilteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "lowToHigh") {
      sortedAndFilteredProducts.sort((a, b) => a.price - b.price);
    }

    setSortedProducts(sortedAndFilteredProducts);
    setCurrentPage(1); // Reset page
  }, [allProducts, searchTerm, sortBy]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (data) => {
    setSearchTerm(data);
  };

  const showPagination = sortedProducts.length > 0;

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="bg-blue-gray-400">
      <Navbar searchData={handleSearch} />
      <div className="flex items-center justify-end mt-4 pr-8">
        <label htmlFor="sortDropdown" className="text-black mr-2">
          Sort By:
        </label>
        <select
          id="sortDropdown"
          className="px-4 py-2 text-black rounded-md"
          onChange={handleSortChange}
        >
          <option value="">Select</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {showPagination && (
        <ReactPaginate
          pageCount={Math.ceil(sortedProducts.length / limit)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          activeClassName="bg-black text-white"
          previousClassName="py-2 px-4  text-black rounded-md mr-3 border border-gray-800"
          nextClassName="py-2 px-4  text-black rounded-md ml-3 border border-gray-800"
          containerClassName="flex mt-8 pb-8 items-center justify-center"
          pageClassName="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-xl mr-3 text-sm"
          breakClassName="w-10 h-10 flex items-center justify-center text-gray-700"
        />
      )}
    </div>
  );
};

export default Homepage;
