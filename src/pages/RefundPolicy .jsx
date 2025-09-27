import React from "react";

const RefundPolicy = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 text-center">
          Refund & Return Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          We aim to ensure customer satisfaction. Please review our refund and
          return policy below.
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            If you are not satisfied with your purchase, you may request a
            return or refund under the following conditions:
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Conditions for Returns
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>
                Defective or damaged products can be returned within 7 days of
                delivery.
              </li>
              <li>
                Refunds will be issued using the same payment method used for
                purchase.
              </li>
              <li>
                Due to the perishable nature of fresh meat, products that have
                been opened, used, or improperly stored are not eligible for
                return.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Contact for Returns
            </h2>
            <p>
              For return requests, please contact us at:{" "}
              <span className="text-red-600 font-medium">+9715444204283</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;
