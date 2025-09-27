import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
                <feature.icon
                  className="h-8 w-8 text-red-600"
                  aria-hidden="true"
                />
              </div>

              {/* Texts */}
              <p className="text-lg font-semibold text-gray-900">
                {feature.text}
              </p>
              <p className="mt-2 text-sm text-gray-500">{feature.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
