import React from "react";
import { useNavigate } from "react-router";



const categories = [
  {
    id: 1,
    name: "Wedding Sarees",
    image: 'https://www.koskii.com/cdn/shop/files/SAUS0039879_WINE_MULTI_5_7cd7d333-98d1-4441-a522-42eddf9beca5.jpg?v=1748345775&width=1800',
  },
  {
    id: 2,
    name: "Party Sarees",
    image: "https://www.koskii.com/cdn/shop/files/SAUS0039879_WINE_MULTI_5_7cd7d333-98d1-4441-a522-42eddf9beca5.jpg?v=1748345775&width=1800",
  },
  {
    id: 3,
    name: "Festival Sarees",
    image: "https://images.unsplash.com/photo-1603468620905-8de7d86b781e",
  },
  {
    id: 4,
    name: "Casual Sarees",
    image: "https://images.unsplash.com/photo-1621786033233-5b1f1a4b18b2",
  },
];

const TopCategories = () => {


  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/saree')
  }
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Top Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={handleClick}
              className="relative group rounded-2xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={category.image} 
                alt={category.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold group-hover:text-pink-300 transition">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;







