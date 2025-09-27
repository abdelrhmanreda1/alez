import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col bg-white overflow-hidden group h-full">
      {/* صورة المنتج */}
      <div className="relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-56 md:h-64 object-contain bg-gray-50 p-2 rounded-t-xl"
        />

        {/* Overlay لزرار View */}
        <button
          onClick={() => navigate(`/list-products/${product.id}`)}
          className="absolute inset-0 flex items-center justify-center 
                     bg-black/40 opacity-0 group-hover:opacity-100 
                     transition duration-300"
        >
          <span className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            <AiOutlineEye className="w-5 h-5" /> View Details
          </span>
        </button>
      </div>

      {/* التفاصيل */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h1>
          <p className="text-red-600 font-bold text-xl mb-4">
            {product.price} AED
          </p>
        </div>

        {/* زرار Add to Cart دايمًا في الأسفل */}
        <button
          onClick={handleAdd}
          className="bg-red-600 text-white w-full py-2 rounded-md font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 mt-auto"
        >
          <IoCartOutline className="w-5 h-5" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
