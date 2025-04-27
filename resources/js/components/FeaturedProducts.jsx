import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // ✅ Add Autoplay here!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedProducts = ({ products }) => {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our popular bubble teas and sweet treats that customers can't get enough of.
            Made with premium ingredients for the perfect flavor experience.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]} // ✅ Include Autoplay module
              spaceBetween={30}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 3000, // ✅ 3 seconds before swiping
                disableOnInteraction: false, // ✅ Keep autoplay even if user interacts
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
              }}
              className="max-w-7xl mx-auto"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-60">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-2 px-3 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full">
                        ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-pink-600 px-2 py-1 bg-pink-50 rounded-full">
                          {product.category}
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          className="inline-flex items-center text-pink-600 hover:text-pink-700"
                        >
                          View Details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Pink Arrows */}
              <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 z-20 cursor-pointer hover:bg-pink-600 transition">
                ❮
              </div>
              <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 z-20 cursor-pointer hover:bg-pink-600 transition">
                ❯
              </div>
            </Swiper>

            {/* Dots Pagination */}
            <div className="swiper-pagination mt-8 flex justify-center" />
          </div>
        )}

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="px-6 py-3 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transition inline-flex items-center"
          >
            View Full Menu
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
