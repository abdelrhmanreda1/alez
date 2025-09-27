import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";

import HomeProducts from "./HomeProducts ";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Carousel />
      <MidBanner />
      <HomeProducts />
      <Features />
    </div>
  );
};

export default Home;
