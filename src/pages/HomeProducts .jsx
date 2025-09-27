import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";

const HomeProducts = () => {
  // ✅ نجيب المنتجات من الـ API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await api.get("/list-products");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  const products = data || [];

  return (
    <div className="w-[90%] mx-auto my-12">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured <span className="text-red-600">Products</span>
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <Lottie animationData={notfound} className="w-[300px]" />
        </div>
      )}
    </div>
  );
};

export default HomeProducts;
