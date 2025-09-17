import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-[600px] text-center">
      <h1 className="text-green-600 font-bold text-4xl mb-4">
        🎉 Thank you for your order!
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Your order has been placed successfully. We’ll notify you once it’s on
        the way 🚚
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
