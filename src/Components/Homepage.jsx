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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (currentPage - 1) * limit;

        const response = await fetch(
          `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
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

    fetchProducts();
  }, [currentPage, limit]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const showPagination = products.length > 0 && !searchTerm;

  return (
    <div className=" bg-blue-gray-400">
      <Navbar
        searchData={searchData}
        setSearchTerm={setSearchTerm}
        onHomepageClick={handleHomepageClick}
      />
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
