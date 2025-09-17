import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { AiOutlineEye } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";

const CategoryProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: async () => {
      const res = await api.get(`/products/category/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1); // ✅ بيروح للـ API من الـ Context
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center hover:bg-gray-700 transition"
      >
        <ChevronLeft /> Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border border-gray-100 rounded-xl shadow-md hover:shadow-2xl transition bg-white flex flex-col overflow-hidden group"
          >
            {/* Product Image + Hover Button */}
            <div className="relative w-full h-52 overflow-hidden">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />

              {/* View Details Button */}
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

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg font-semibold">
                  {product.price} AED
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto cursor-pointer flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
              >
                <IoCartOutline className="w-6 h-6" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
