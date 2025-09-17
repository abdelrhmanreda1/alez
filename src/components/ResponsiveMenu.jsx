import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  const handleLogout = () => {
    logout();
    setOpenNav(false);
    navigate("/login");
  };

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"} 
        fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col 
        justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden 
        rounded-r-xl shadow-md transition-all`}
    >
      <div>
        {/* Profile Section */}
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-bold">
              {getInitial(user.name)}
            </div>
          ) : (
            <FaUserCircle size={50} />
          )}
          <div>
            <h1 className="font-semibold">
              Hello, {user?.name || "Guest"}
            </h1>
            <h1 className="text-sm text-slate-500">
              {user ? "Premium User" : "Please login"}
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to={"/"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>Home</li>
            </Link>
            <Link
              to={"/products"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>Products</li>
            </Link>
            <Link
              to={"/about"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>About</li>
            </Link>
            <Link
              to={"/contact"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* Auth Buttons */}
      <div className="mt-10">
        {!user ? (
          <button
            onClick={() => {
              setOpenNav(false);
              navigate("/login");
            }}
            className="w-full bg-red-500 text-white py-2 rounded-md cursor-pointer hover:bg-red-400"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 text-white py-2 rounded-md cursor-pointer hover:bg-gray-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
