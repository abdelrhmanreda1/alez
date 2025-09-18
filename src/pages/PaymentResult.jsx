import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Processing your payment...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        {paymentData.pending ? (
          <>
            <Clock className="mx-auto text-yellow-500" size={70} />
            <h1 className="text-yellow-600 text-3xl font-bold mt-4">
              Payment Pending
            </h1>
            <p className="mt-3 text-gray-600">
              We are still processing your payment. Please wait a moment.
            </p>
          </>
        ) : paymentData.success ? (
          <>
            <CheckCircle className="mx-auto text-green-600" size={70} />
            <h1 className="text-green-600 text-3xl font-bold mt-4">
              Payment Successful
            </h1>
            <p className="mt-3 text-gray-700">
              Thank you! Your payment of{" "}
              <strong>{paymentData.amount} AED</strong> has been received.
            </p>
            <p className="mt-1 text-gray-500">Order ID: #{paymentData.orderId}</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-600 hover:bg-green-700 transition-all text-white px-6 py-2 rounded-md mt-6"
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-red-600" size={70} />
            <h1 className="text-red-600 text-3xl font-bold mt-4">
              Payment Failed
            </h1>
            <p className="mt-3 text-gray-700">
              Sorry, your payment could not be processed.
            </p>
            <p className="mt-1 text-gray-500">Please try again later.</p>
            <button
              onClick={() => navigate("/cart")}
              className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-2 rounded-md mt-6"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
