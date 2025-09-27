import React from "react";

const ShippingPolicy = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 text-center">
          Shipping Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          We strive to deliver your orders quickly and reliably. Please review
          our shipping details below.
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Delivery Times
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Abu Dhabi: 24 hours delivery</li>
              <li>Other Emirates: 2–3 working days</li>
              <li>Free shipping on bulk orders above AED 500</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Trusted Couriers
            </h2>
            <p>
              We partner with trusted courier services to ensure safe and timely
              delivery of your orders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingPolicy;
