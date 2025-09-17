import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../lib/axios";
import emptyCart from "../assets/empty-cart.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Schema for validation
const schema = yup.object().shape({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  zip: yup
    .string()
    .matches(/^[0-9]+$/, "Zip must be numbers only")
    .length(5, "Zip must be exactly 5 digits")
    .required("Zip code is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone number is required"),
});

const Cart = () => {
  const { cartItem, updateQuantity, deleteItem, loading } = useCart();
  const navigate = useNavigate();

  const safeCart = Array.isArray(cartItem) ? cartItem : [];

  // ✅ السعر
  const totalPrice = safeCart.reduce(
    (total, item) =>
      total + parseFloat(item.product?.price || 0) * (item.quantity || 1),
    0
  );

  // ✅ Addresses state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ✅ Save Address
  const onSubmit = async (data) => {
    try {
      await api.post("/addresses", data);
      toast.success("Address saved successfully 🏠");
      fetchAddresses();
      reset();
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Failed to save address!");
    }
  };

  // ✅ Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const res = await api.get("/addresses");
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
    }
  };

  // ✅ Checkout Handler

const handleCheckout = async () => {
  if (!selectedAddress) {
    toast.error("Please select an address before checkout 🏠");
    return;
  }

  if (safeCart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }

  // ➝ بدل ما تروح Paymob على طول، ودّي البيانات للـ OrderReview
  navigate("/order-review", {
    state: {
      cart: safeCart,
      address: selectedAddress,
      total: totalPrice + 5, // Items + handling charge
    },
  });
};



  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {safeCart.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({safeCart.length})</h1>

          {/* Cart Items */}
          <div className="mt-10 space-y-4">
            {safeCart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.images?.[0]?.url}
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">
                      {item.product?.name}
                    </h1>
                    <p className="text-red-500 font-semibold text-lg">
                      {item.product?.price} AED
                    </p>
                  </div>
                </div>
                <div className="bg-red-500 cursor-po text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
                <span
                  onClick={() => deleteItem(item.id)}
                  className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                >
                  <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                </span>
              </div>
            ))}
          </div>

          {/* Bill + Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mt-6">
            {/* Delivery Form */}
            <div className="bg-gray-100 rounded-md p-7 space-y-3">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                  type="text"
                  placeholder="Street"
                  {...register("street")}
                  className="p-2 rounded-md w-full"
                />
                <p className="text-red-500 text-sm">{errors.street?.message}</p>

                <input
                  type="text"
                  placeholder="City"
                  {...register("city")}
                  className="p-2 rounded-md w-full"
                />
                <p className="text-red-500 text-sm">{errors.city?.message}</p>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="State"
                    {...register("state")}
                    className="p-2 rounded-md w-full"
                  />
                  <input
                    type="text"
                    placeholder="Zip"
                    {...register("zip")}
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <p className="text-red-500 text-sm">{errors.zip?.message}</p>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Country"
                    {...register("country")}
                    className="p-2 rounded-md w-full"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <p className="text-red-500 text-sm">{errors.phone?.message}</p>

                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-2 rounded-md w-full"
                >
                  Save Address
                </button>
              </form>

              {/* Show saved addresses */}
              <div className="mt-5">
                <h2 className="font-semibold text-lg">Saved Addresses:</h2>
                {addresses.length > 0 ? (
                  <ul className="space-y-2">
                    {addresses.map((addr, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          onChange={() => setSelectedAddress(addr)}
                        />
                        <span>
                          {addr.street}, {addr.city}, {addr.state},{" "}
                          {addr.country} - {addr.phone}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No addresses saved yet.
                  </p>
                )}
              </div>
            </div>

            {/* Bill Section */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 h-max">
              <h1 className="text-gray-800 font-bold text-xl mb-3">
                Bill details
              </h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Items total
                </h1>
                <p>{totalPrice.toFixed(2)} AED</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">25 AED</span> FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">5 AED</p>
              </div>
              <hr className="text-gray-200 my-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">
                  {(totalPrice + 5).toFixed(2)} AED
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-4xl">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="empty" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
