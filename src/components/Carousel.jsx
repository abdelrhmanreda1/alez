import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../lib/axios";

const Carousel = () => {
  const fetchSliders = async () => {
    const res = await api.get("/list-sliders");
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["sliders"],
    queryFn: fetchSliders,
  });

  const sliders = data?.data || [];

  // Prev Arrow
  const SamplePrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white p-2 rounded-full shadow-md transition"
    >
      <AiOutlineArrowLeft className="w-5 h-5" />
    </button>
  );

  // Next Arrow
  const SampleNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white p-2 rounded-full shadow-md transition"
    >
      <AiOutlineArrowRight className="w-5 h-5" />
    </button>
  );

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {sliders.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-red-900 via-gray-900 to-black"
          >
            <div className="flex flex-col-reverse md:flex-row gap-10 justify-center items-center min-h-[600px] px-6 md:px-12 py-10">
              {/* Text Section */}
              <div className="md:space-y-6 space-y-3 max-w-xl text-center md:text-left">
                <h3 className="text-red-400 font-semibold uppercase text-sm tracking-wide">
                  Premium Quality
                </h3>
                <h1 className="md:text-5xl text-2xl font-bold uppercase text-white leading-snug">
                  {item.title}
                </h1>
                <p className="text-gray-300 text-base md:text-lg">
                  {item.description}
                </p>
                <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-md font-semibold mt-4 transition shadow-lg">
                  Shop Now
                </button>
              </div>

              {/* Image Section */}
              <div className="flex justify-center">
                <img
                  src={item.image?.url}
                  alt={item.title}
                  className="rounded-2xl w-[320px] md:w-[550px] hover:scale-105 transition-transform duration-300 shadow-xl shadow-red-500/30"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Categories under slider */}
      <Category />
    </div>
  );
};

export default Carousel;
