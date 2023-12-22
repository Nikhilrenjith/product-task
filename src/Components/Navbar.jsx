import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/homepage" className="text-2xl font-bold flex items-center">
        <FaHome className="mr-2" />
        Logo
      </Link>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 mr-8 border rounded-md w-96 text-black"
        />
        <button className="w-10 h-10">
          <FaSearch className="text-xl mr-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
