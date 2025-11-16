import React from "react";
import TopCategories from "../components/TopCategories";
import { NavLink } from "react-router";
import FeaturedSarees from "../components/FeaturedSarees";
import HappyCustomers from "../components/HappyCustomers";
const Home = () => {
  return (
    <>
      <section className="relative bg-cover bg-center h-screen flex items-center justify-center text-center text-white bg-[url('./src/assets/sarree.png')]">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Rent Sarees for Every Occasion ✨
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Find your perfect saree for weddings, parties, or festivals.
            Affordable, elegant, and hassle-free rentals.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300">
            <NavLink to={"/saree"}> Explore Collection </NavLink>
          </button>
        </div>
      </section>

      <section id="FeaturedSaree">
        <FeaturedSarees />
      </section>
      <section className="TopCategories">
        <TopCategories />
      </section>


      <section id="HappyCustomers">
        <HappyCustomers />
      </section>
    </>
  );
};

export default Home;
