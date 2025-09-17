import React from "react";
import { useLocation } from "react-router-dom";
import api from "../lib/axios";
import { toast } from "react-toastify";

const OrderReview = () => {
  const { state } = useLocation();

  if (!state) {
    return <p className="text-center mt-10">No order details found.</p>;
  }

  const { cart, address, total } = state;

  const handlePayNow = async () => {
    try {
      const orderData = {
        delivery_date: new Date().toISOString().split("T")[0],
        delivery_time: "15:30",
        address_id: address.id,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        payment_method: "paymob",
      };

      const res = await api.post("/order", orderData);
      if (res.data.redirect_url) {
        window.location.href = res.data.redirect_url;
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order!");
    }
  };

  // حساب الـ Subtotal
  const itemsTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handlingCharge = 5;
  const grandTotal = itemsTotal + handlingCharge;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>

      {/* Products */}
      <div className="space-y-3 mb-6">
        {cart.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b pb-2 text-gray-700"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>{(item.product.price * item.quantity).toFixed(2)} AED</span>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="mb-6">
        <h2 className="font-semibold">Delivery Address</h2>
        <p className="text-gray-600">
          {address.street}, {address.city}, {address.state}, {address.country} -{" "}
          {address.phone}
        </p>
      </div>

      {/* Bill Details */}
      <div className="bg-gray-50 p-4 rounded-md space-y-2 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Items Total</span>
          <span>{itemsTotal.toFixed(2)} AED</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Delivery</span>
          <span className="text-green-600 font-semibold">FREE</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Handling Charge</span>
          <span>{handlingCharge.toFixed(2)} AED</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>{grandTotal.toFixed(2)} AED</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayNow}
        className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-md w-full hover:bg-red-600 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default OrderReview;
