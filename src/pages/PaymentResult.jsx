import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // جِيب الـ query params من الـ URL
    const queryParams = new URLSearchParams(location.search);

    const success = queryParams.get("success");
    const pending = queryParams.get("pending");
    const amount = queryParams.get("amount_cents");
    const orderId = queryParams.get("order");

    setPaymentData({
      success: success === "true",
      pending: pending === "true",
      amount: amount ? amount / 100 : 0,
      orderId,
    });
  }, [location.search]);

  if (!paymentData) {
    return <p className="text-center mt-10">Processing payment...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 text-center">
      {paymentData.pending ? (
        <>
          <h1 className="text-yellow-600 text-3xl font-bold">Payment Pending ⏳</h1>
          <p className="mt-3 text-gray-600">We are still processing your payment.</p>
        </>
      ) : paymentData.success ? (
        <>
          <h1 className="text-green-600 text-3xl font-bold">Payment Successful ✅</h1>
          <p className="mt-3 text-gray-600">
            Thank you! Your payment of <strong>{paymentData.amount} AED</strong> has been received.
          </p>
          <p className="mt-1 text-gray-500">Order ID: #{paymentData.orderId}</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-6 py-2 rounded-md mt-5"
          >
            Continue Shopping
          </button>
        </>
      ) : (
        <>
          <h1 className="text-red-600 text-3xl font-bold">Payment Failed ❌</h1>
          <p className="mt-3 text-gray-600">Your payment could not be processed.</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-600 text-white px-6 py-2 rounded-md mt-5"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentResult;
