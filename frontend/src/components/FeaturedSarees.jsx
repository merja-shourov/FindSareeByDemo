import React from "react";
import SareeCard from "./SareeCard";

const featuredSarees = [
  {
    id: 1,
    name: "Royal Red Banarasi Saree",
    price: 1500,
    image: "https://images.unsplash.com/photo-1601121141949-09c9c8f3eae5",
    occasion: "Wedding",
  },
  {
    id: 2,
    name: "Elegant Blue Georgette Saree",
    price: 1100,
    image: "https://images.unsplash.com/photo-1596464716120-6e6f8d0f2a5a",
    occasion: "Party",
  },
  {
    id: 3,
    name: "Soft Cotton Yellow Saree",
    price: 850,
    image: "https://images.unsplash.com/photo-1621786033233-5b1f1a4b18b2",
    occasion: "Casual",
  },
];

const FeaturedSarees = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Featured Sarees
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition">
            View All Sarees
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSarees;
