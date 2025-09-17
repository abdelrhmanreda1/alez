import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/list-categories");
      return res.data.data; // هنا الـ array اللي فيها الكاتيجوريز
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="bg-[#101829] py-7">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {data?.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products/category/${cat.id}`)}
            className="cursor-pointer flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={cat.images[0]?.url}
              alt={cat.name}
              className="w-20 h-20 object-cover rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
