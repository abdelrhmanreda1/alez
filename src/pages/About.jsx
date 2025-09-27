import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900">
          About <span className="text-red-600">ALEZ Meat Trading</span>
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Welcome to{" "}
          <span className="font-semibold text-red-600">
            ALEZ Meat Trading Establishment
          </span>
          , your premier destination for the finest fresh and chilled meat in
          Abu Dhabi. From premium beef cuts to wholesome lamb selections, we are
          dedicated to elevating your culinary experience with top-quality
          products and exceptional service.
        </p>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At ALEZ, our mission is to deliver the freshest meat to every table,
            making premium quality accessible to all. We are passionate about
            connecting people with the finest cuts, sourced from trusted
            suppliers, and delivered with care and efficiency at competitive
            prices.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Why Choose ALEZ?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              Top-Quality Meat Products from trusted and certified suppliers
            </li>
            <li>Freshness Guaranteed with rigorous quality checks</li>
            <li>Reliable Delivery Service, ensuring timely arrivals</li>
            <li>Expert Customer Support, always ready to assist</li>
            <li>Flexible Ordering Options including wholesale and retail</li>
          </ul>
        </section>

        {/* Vision */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where every meal is enhanced by the highest
            quality meat. At ALEZ, we are committed to staying ahead of the
            curve, offering sustainable and premium meat solutions that are both
            practical and affordable.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Join the ALEZ Family
          </h3>
          <p className="text-gray-700 mb-6">
            Whether you're a home cook, a restaurant owner, or a bulk buyer,
            ALEZ has something for everyone. Experience the difference of
            professional meat trading today.
          </p>
          <Link to="/products">
            <button className="bg-red-600 cursor-pointer text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-red-700 transition duration-300 shadow-md">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
