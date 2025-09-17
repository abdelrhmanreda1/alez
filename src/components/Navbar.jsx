import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ أول حرف من الاسم
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  // ✅ إجمالي الكمية في الكارت
// عدد المنتجات المختلفة
const cartCount = Array.isArray(cartItem) ? cartItem.length : 0;



  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>

          {/* Location */}
          <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden relative">
            <MapPin className="text-red-500" />
            <span className="font-semibold ">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleDropdown} />
            {openDropdown && (
              <div className="absolute top-12 left-0 w-[250px] h-max shadow-2xl z-50 bg-white border-2 p-5 border-gray-100 rounded-md">
                <h1 className="font-semibold mb-4 text-xl flex justify-between">
                  Change Location{" "}
                  <span onClick={toggleDropdown} className="cursor-pointer">
                    <CgClose />
                  </span>
                </h1>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
                >
                  Detect my location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            {cartCount > 0 && (
              <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* دايرة فيها أول حرف */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                  {getInitial(user?.name)}
                </div>
                <span className="font-semibold">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;
