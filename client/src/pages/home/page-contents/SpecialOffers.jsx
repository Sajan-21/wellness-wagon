import React from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import c1 from "../../../../images/c-1.jpg";
import c2 from "../../../../images/c-2.jpg";
import c3 from "../../../../images/c-3.jpg";
import './specialOffers.css'

function SpecialOffers() {
  const params = useParams();
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold tracking-tight text-gray-900 pb-10 nav-font">
              Special Offers
            </div>
            <p>
            <Link to={params.auth_id ? `/shop/${params.auth_id}/${params.user_type}` : `/shop` } >see more</Link>
            </p>
          </div>
          <div className="swiper-div">
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
              <img className="w-screen rounded-2xl" src={c1} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-screen rounded-2xl" src={c2} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-screen rounded-2xl" src={c3} alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffers;