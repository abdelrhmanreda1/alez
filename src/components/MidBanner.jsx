import banner from "../assets/banner-hero.jpeg";

const MidBanner = () => {
  return (
    <div className=" my-12">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl min-h-[450px] md:min-h-[600px] lg:min-h-[750px] bg-center bg-cover bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Overlay ناعم */}
        <div className="absolute inset-0 bg-black/40 md:rounded-2xl"></div>

        {/* المحتوى */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Finest Fresh Meat at Your Fingertips
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-200">
            Discover the finest fresh and chilled meat with competitive prices
            and free delivery on bulk orders.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
