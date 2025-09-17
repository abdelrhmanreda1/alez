import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (formData) => api.post("/login", formData),
    onSuccess: (res) => {
      const { token, user } = res.data;
      login(user, token);
      toast.success("Login successful 🎉");
        navigate("/");

    },
    onError: (err) => {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Login failed ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    mutation.mutate({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
          >
            {mutation.isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* 🔗 رابط التحويل للـ Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
