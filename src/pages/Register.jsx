import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => api.post("/register", formData),
    onSuccess: () => {
      toast.success("User registered successfully!");
      navigate("/login"); // ✅ يحول على صفحة اللوجن بعد النجاح
    },
    onError: (err) => {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Register failed!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    mutation.mutate({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
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
          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* زرار التسجيل مع لودر */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`w-full flex justify-center items-center bg-red-500 text-white py-2 rounded-md transition-all ${
              mutation.isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          >
            {mutation.isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
