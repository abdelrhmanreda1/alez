import { IoCartOutline } from "react-icons/io5";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { cartItem } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const cartCount = Array.isArray(cartItem) ? cartItem.length : 0;
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-[90%] mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/mainlogo.webp"
            alt="alez logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="font-bold text-2xl md:text-3xl">
            <span className="text-red-600">Al</span>
            <span className="text-gray-900">EZ</span>
          </h1>
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-lg font-medium">
            {["Home", "Products", "About", "Contact"].map((item, i) => (
              <NavLink
                key={i}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `cursor-pointer px-2 py-1 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-7 w-7 text-gray-700 hover:text-red-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500 transition"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">
                  {getInitial(user?.name)}
                </div>
                <span className="font-medium text-gray-800">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            {openNav ? (
              <HiMenuAlt3
                onClick={() => setOpenNav(false)}
                className="h-7 w-7 text-gray-700 cursor-pointer"
              />
            ) : (
              <HiMenuAlt1
                onClick={() => setOpenNav(true)}
                className="h-7 w-7 text-gray-700 cursor-pointer"
              />
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <ResponsiveMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        handleLogout={handleLogout}
        user={user}
      />
    </header>
  );
};

export default Navbar;
