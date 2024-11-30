import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import c1 from "../../../images/c-1.jpg";
import c2 from "../../../images/c-2.jpg";
import c3 from "../../../images/c-3.jpg";

function SpecialOffers() {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 py-5">
              Special Offers
            </h2>
            <p>
              <Link to="" />
              see more
            </p>
          </div>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            className=""
          >
            <SwiperSlide>
              <img className="w-screen rounded-lg" src={c1} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-screen rounded-lg" src={c2} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-screen rounded-lg" src={c3} alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffers;