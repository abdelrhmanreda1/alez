import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { MapPin, Phone, Mail } from "lucide-react";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    try {
      await api.post("/contact", data);
      toast.success("Message sent successfully 🚀");
      reset();
    } catch (err) {
      console.error("Contact error:", err);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-12">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-white text-center mb-10">
          Get in Touch with <span className="text-red-400">Alez</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info Section */}
          <div className="text-white space-y-8">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300 mt-2">
                Have a question or need assistance? We're here to help you with
                your meat needs.
              </p>
            </div>

            <div className="space-y-4 text-gray-200">
              <p className="flex items-center gap-3">
                <MapPin className="text-red-400 w-6 h-6" />
                Meat Market, Shop No-12, Mushrif Mall, Abu Dhabi, U.A.E.
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-red-400 w-6 h-6" />
                ahmedabub831@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <Phone className="text-red-400 w-6 h-6" />
                +9715444204283
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <p className="text-red-400 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Phone Number</label>
              <input
                type="text"
                {...register("phone")}
                placeholder="0501234567"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <p className="text-red-400 text-sm">{errors.phone?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea
                rows="4"
                {...register("message")}
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              ></textarea>
              <p className="text-red-400 text-sm">{errors.message?.message}</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              {isSubmitting ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
