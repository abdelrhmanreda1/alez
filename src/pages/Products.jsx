import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  // ✅ نجيب الداتا من الـ API الحقيقي
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/list-products");
      return res.data.data;
    },
  });

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  // ✅ فلترة الداتا حسب السيرش + الكاتيجوري + الرينج
  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category_name === category) &&
      parseFloat(item.price) >= priceRange[0] &&
      parseFloat(item.price) <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  // ✅ نطلع الكاتيجوريز من الـ API
  const categories = [...new Set(data?.map((p) => p.category_name))];

  return (
    <div>
      <div className="w-[84%] mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          categories={categories} // 👈 مبعوت للـ MobileFilter
        />

        {filteredData?.length > 0 ? (
          <div className="flex gap-8">
            <FilterSection
              search={search}
              setSearch={setSearch}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              handleCategoryChange={handleCategoryChange}
              categories={categories} // 👈 كمان للـ FilterSection
            />

            <div className="flex flex-col justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                {filteredData
                  ?.slice(page * 8 - 8, page * 8)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
              </div>
              <Pagination
                pageHandler={pageHandler}
                page={page}
                dynamicPage={dynamicPage}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
            <Lottie animationData={notfound} classID="w-[500px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
