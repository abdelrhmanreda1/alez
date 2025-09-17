import React from "react";
import { FaFilter } from "react-icons/fa6";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
  categories, // 👈 جاي من props
}) => {
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter onClick={toggleFilter} className="text-gray-800" />
      </div>

      {openFilter ? (
        <div className="bg-gray-100 p-2 md:hidden">
          {/* search */}
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />

          {/* categories */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                value="All"
                checked={category === "All"}
                onChange={handleCategoryChange}
              />
              <span className="cursor-pointer">All</span>
            </div>
            {categories?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={category === item}
                  onChange={handleCategoryChange}
                />
                <span className="cursor-pointer capitalize">{item}</span>
              </div>
            ))}
          </div>

          {/* price range */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label>
              Price Range: {priceRange[0]} - {priceRange[1]} AED
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="transition-all w-[200px]"
            />
          </div>

          {/* reset */}
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPriceRange([0, 5000]);
              setOpenFilter(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MobileFilter;
