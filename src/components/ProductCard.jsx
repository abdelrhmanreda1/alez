import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1); // ✅ ده بيروح للـ API
  };

  return (
    <div className="border border-gray-100 rounded-xl shadow-md hover:shadow-2xl transition bg-white flex flex-col overflow-hidden group">
      {/* Image with Hover Button */}
      <div className="relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="bg-gray-100 aspect-square rounded-md"
        />

        {/* Centered Button with light overlay */}
        <button
          onClick={() => navigate(`/list-products/${product.id}`)}
          className="absolute cursor-pointer inset-0 flex items-center justify-center 
                     bg-white/70 opacity-0 
                     group-hover:opacity-100 transition"
        >
          <span className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
            <AiOutlineEye className="w-5 h-5" /> View Details
          </span>
        </button>
      </div>

      {/* Details Section */}
      <div className="p-2 flex flex-col flex-grow">
        <h1 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h1>
        <p className="bg-red-100 text-red-600 px-3 py-1 rounded-lg font-semibold my-4 w-max">
          {product.price} AED
        </p>
        <button
          onClick={handleAdd}
          className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-red-600 transition"
        >
          <IoCartOutline className="w-6 h-6" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
