import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/list-categories");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#101829] py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {data?.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products/category/${cat.id}`)}
            className="cursor-pointer flex flex-col items-center bg-[#1b2435] hover:bg-[#222c41] p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={cat.images[0]?.url}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-red-500 mb-4 hover:scale-105 transition-transform"
            />
            <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
