import React from "react";

const FilterSection = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  handleCategoryChange,
  categories,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 h-max hidden md:block w-72 border border-gray-200 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filter Products</h2>

      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 p-2 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Category</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
            <input
              type="radio"
              name="category"
              value="All"
              checked={category === "All"}
              onChange={handleCategoryChange}
              className="text-red-600 focus:ring-red-500"
            />
            <span>All</span>
          </label>
          {categories?.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-red-600"
            >
              <input
                type="radio"
                name="category"
                value={item}
                checked={category === item}
                onChange={handleCategoryChange}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="capitalize">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Price */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">
          Price Range
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {priceRange[0]} - {priceRange[1]} AED
        </p>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-red-600"
        />
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Reset */}
      <button
        className="bg-red-600 text-white rounded-md px-4 py-2 w-full font-medium hover:bg-red-700 transition"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
