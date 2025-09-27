import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Your privacy matters to us. Please read the details below to
          understand how we handle your personal data.
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            We respect your privacy and are committed to protecting your
            personal data. When you place an order on our website, we collect
            necessary information such as your name, phone number, email
            address, and delivery address.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Information Usage
            </h2>
            <p className="mb-2">This information is used only for:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Processing your orders</li>
              <li>Delivery purposes</li>
              <li>Contacting you regarding your order</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Data Sharing
            </h2>
            <p>
              We do not share your information with third parties except for
              payment processors (Paymob) and trusted shipping partners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Rights
            </h2>
            <p>
              You have the right to request deletion of your personal data at
              any time. For questions, contact us at:{" "}
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

export default PrivacyPolicy;
