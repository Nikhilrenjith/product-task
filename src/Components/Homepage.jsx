import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const fetchProducts = async () => {
    try {
      const skip = (currentPage - 1) * limit;
      let url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;

      if (sortBy) {
        url += `&sort=${sortBy}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          // Adjust the sorting logic here based on sortBy
          const sortedProducts =
            sortBy === "lowToHigh"
              ? data.products.sort((a, b) => a.price - b.price)
              : sortBy === "highToLow"
              ? data.products.sort((a, b) => b.price - a.price)
              : data.products;

          setProducts(sortedProducts);
          setLimit(data.limit);
          setTotal(data.total);
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

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, sortBy]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleSort = (order) => {
    console.log(`Sorting order: ${order}`);
    setSortBy(order);
    setCurrentPage(1);
  };

  const searchData = async (data) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${data}`
      );
      if (response.ok) {
        const resData = await response.json();
        setProducts(resData.products);
        setCurrentPage(1); // Reset currentPage to 1 when a search is performed
        setTotal(resData.total);
      } else {
        console.error("Failed to fetch the data:", response.status);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleHomepageClick = () => {
    setCurrentPage(1); // Reset currentPage to 1 when the homepage logo is clicked
  };

  const showPagination = products.length > 0 && !searchTerm;

  return (
    <div className="bg-blue-gray-400">
      <Navbar
        searchData={searchData}
        setSearchTerm={setSearchTerm}
        onHomepageClick={handleHomepageClick}
      />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
          onClick={() => handleSort("lowToHigh")}
        >
          Low to High
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => handleSort("highToLow")}
        >
          High to Low
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {showPagination && (
        <ReactPaginate
          pageCount={Math.ceil(total / limit)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          activeClassName="bg-black text-white"
          previousClassName="py-2 px-4 text-black rounded-md mr-3 border border-gray-800"
          nextClassName="py-2 px-4 text-black rounded-md ml-3 border border-gray-800"
          containerClassName="flex mt-8 pb-8 items-center justify-center"
          pageClassName="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-xl mr-3 text-sm"
          breakClassName="w-10 h-10 flex items-center justify-center text-gray-700"
        />
      )}
    </div>
  );
};

export default Homepage;
