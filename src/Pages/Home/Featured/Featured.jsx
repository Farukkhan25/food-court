import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
  return (
    <div className="featured-item bg-fixed bg-cover bg-center">
      <div className=" bg-[#151515] bg-opacity-40 md:px-12 py-2 mb-12 text-rose-700 ">
        <SectionTitle
          subHeading={"Check it out"}
          heading={"Featured"}
        ></SectionTitle>
        <div className="md:flex justify-center md:gap-12 items-center py-8 px-16">
          <div>
            <img src={featuredImg} alt="" />
          </div>
          <div className=" text-white">
            <p>Feb 20,2025</p>
            <p className="uppercase font-Cinzel font-bold py-1">
              Where can i get some?
            </p>
            <p
              className="
            text-cyan-200 text-justify"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
              distinctio, cum reiciendis qui iste vitae temporibus quidem?
              Perferendis alias omnis doloribus exercitationem. Suscipit eos eum
              quas autem animi dolore. Nulla?
            </p>
            <button className="btn btn-outline sm:btn-sm md:btn-md lg:btn-lg uppercase border-0 border-b-4 border-rose-700 mt-4 text-white">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
