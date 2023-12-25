import React, { useState } from "react";
import { FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Navbar = ({ searchData, onHomepageClick }) => {
  const [data, setData] = useState("");
  const { id } = useParams();
  const handleLogoClick = () => {
    // Call the prop function to reset currentPage in the Homepage component
    onHomepageClick();
  };

  return (
    <nav className="bg-blue-gray-800 p-4 text-white flex justify-between items-center">
      <Link
        to={`/homepage/${id}`}
        className="text-2xl font-bold flex items-center"
        onClick={handleLogoClick}
      >
        <FaHome className="mr-2" />
        Logo
      </Link>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 mr-2 border rounded-md w-96 text-black"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="w-10 h-10" onClick={() => searchData(data)}>
          <FaSearch className="text-xl mr-4" />
        </button>
        <Link to={`/cart/${id}`} className="text-white">
          <FaShoppingCart className="text-xl" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
