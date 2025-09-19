
import banner from '../assets/banner-hero.jpeg'

const MidBanner = () => {
  return (
    <div className="bg-gray-100 md:py-24">
      <div 
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 h-[400px] md:h-[600px] lg:h-[840px] bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Finest Fresh Meat at Your Fingertips
            </h1>
            <p className="text-lg md:text-xl mb-6">
Discover the finest fresh and chilled meat with competitive prices and free delivery on bulk orders.
            </p>
            <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner
