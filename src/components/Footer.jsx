import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Info */}
        <div>
          <Link to="/" className="block mb-3">
            <h1 className="text-red-500 text-3xl font-extrabold tracking-wide">
              AlEZ
            </h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Providing the Freshest Meat with Unmatched Quality and Service.
          </p>
          <p className="mt-2 text-sm">
            Meat Market, Shop No-12, Mushrif Mall, Abu Dhabi, U.A.E.
          </p>
          <p className="mt-1 text-sm">Email: ahmedabub831@gmail.com</p>
          <p className="text-sm">Phone: +9715444204283</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
              <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-red-500">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-red-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-red-500">
                Refund & Return Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-red-500">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:text-red-500">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            {[FaFacebook, FaInstagram, FaTwitterSquare, FaPinterest].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition"
                >
                  <Icon className="text-white text-xl" />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">
            Al Ezz Meat Trading Establishment
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
