import React from "react";

const TermsConditions = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center mb-10">
          By using our website and placing an order, you agree to the following
          terms and conditions.
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              General Terms
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>
                You must provide accurate and complete information when placing
                an order.
              </li>
              <li>Payments must be made using valid payment methods.</li>
              <li>
                We are not responsible for product mishandling after delivery.
              </li>
              <li>You must be at least 18 years old to make a purchase.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Policy Updates
            </h2>
            <p>
              We reserve the right to update or modify these policies at any
              time without prior notice. Any changes will be effective
              immediately upon posting on our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Contact Us
            </h2>
            <p>
              For inquiries regarding these Terms & Conditions, please contact
              us at:{" "}
              <span className="text-red-600 font-medium">
                ahmedabub831@gmail.com
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
