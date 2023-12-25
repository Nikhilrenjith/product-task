import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const Navbar = ({ searchData, onHomepageClick, cartCount }) => {
  const [data, setData] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onHomepageClick();
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-gray-800 p-4 text-white flex justify-between items-center relative z-10">
      <Link
        to={`/homepage/${id}`}
        className="text-3xl font-bold flex items-center mr-4"
        onClick={handleLogoClick}
      >
        <FaHome className="mr-2" />
        Logo
      </Link>

      <div className="flex items-center justify-center space-x-2 flex-grow">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded-md w-96 text-black"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <div className="ml-6">
            <button className="w-10 h-10" onClick={() => searchData(data)}>
              <FaSearch className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link to={`/cart/${id}`} className="text-white relative">
          <FaShoppingCart className="text-2xl" />
          {cartCount > 0 && (
            <div className="bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 -right-2 text-xs">
              {cartCount}
            </div>
          )}
        </Link>

        <div className="relative flex items-center px-4">
          <button
            className="text-white focus:outline-none"
            onClick={handleProfileClick}
          >
            <FaUser className="text-2xl" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-6 mt-3 bg-white p-2 rounded shadow z-20 w-40 items-center">
              <div
                className="flex items-center w-full text-left hover:bg-gray-200 px-4 py-2"
                onClick={handleSignOut}
              >
                <FaSignOutAlt className="mr-2 text-black" />
                <span className="text-black">Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
