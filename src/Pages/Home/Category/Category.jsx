import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section>
      <SectionTitle
        subHeading={"From 11:00 am to 10:00 pm"}
        heading={"ORDER ONLINE"}
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoPlay={true}
        infiniteLoop={true}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mb-5"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h3 className="text-4xl text-white font-Cinzel font-bold uppercase text-center -mt-12">
            Salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className=" text-4xl text-white font-Cinzel font-bold uppercase text-center -mt-12">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className=" text-4xl text-white font-Cinzel font-bold uppercase text-center -mt-12">
            soup
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className=" text-4xl text-white font-Cinzel font-bold uppercase text-center -mt-12">
            Cakes
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className=" text-4xl text-white font-Cinzel font-bold uppercase text-center -mt-12">
            Deserts
          </h3>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
