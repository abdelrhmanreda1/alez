import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useCart } from "../context/CartContext";
import { ChevronLeft } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false); // ✅ loading state

  // ✅ Fetch product by ID
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/list-products/${id}`);
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

  if (isError || !product) {
    return <p className="text-center text-red-500">Failed to load product</p>;
  }

  // ✅ Add to Cart Handler
  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product, quantity); // 👈 ابعت product + quantity صح
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center hover:bg-gray-700 transition"
      >
        <ChevronLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Images */}
        <div>
          <div className="w-full h-96 border rounded-lg overflow-hidden bg-gray-50">
            <img
              src={selectedImage || product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex gap-3 mt-3">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt="thumb"
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                  selectedImage === img.url ? "border-red-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-5">{product.description}</p>

          <p className="text-2xl font-semibold text-red-600 mb-6">
            {product.price} AED
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-16 text-center border rounded-md"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold">
           +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`py-3 px-5 rounded-lg flex items-center gap-2 justify-center shadow-md transition-all ${
              adding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            <IoCartOutline className="w-6 h-6" />{" "}
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
