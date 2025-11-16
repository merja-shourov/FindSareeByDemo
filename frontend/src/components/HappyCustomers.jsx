import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Ayesha Rahman",
    review:
      "Loved the saree quality! I rented it for my best friend’s wedding — got so many compliments!",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Maya Das",
    review:
      "The saree arrived on time and was even more beautiful in person. Great experience!",
    image:
      "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 3,
    name: "Rita Saha",
    review:
      "Very easy to rent and return. I’ll definitely rent again for upcoming events!",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    review:
      "Perfect fit, elegant design, and amazing service. Highly recommend!",
    image:
      "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: 5,
    name: "Tanima Akter",
    review:
      "Rented a saree for Eid — it looked stunning! Thank you for making it so easy!",
    image:
      "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    id: 6,
    name: "Shirin Alam",
    review:
      "Affordable and high-quality! I got my saree exactly as shown in the photo.",
    image:
      "https://randomuser.me/api/portraits/women/31.jpg",
  },
];

const HappyCustomers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const customersPerPage = 3;

  const nextSlide = () => {
    if (currentIndex + customersPerPage < customers.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleCustomers = customers.slice(
    currentIndex,
    currentIndex + customersPerPage
  );

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Happy Customers 💕
        </h2>

        {/* Customers */}
        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-600 transition ${
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Customer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition text-center"
              >
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{customer.name}</h3>
                <div className="flex justify-center my-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{customer.review}</p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            disabled={currentIndex + customersPerPage >= customers.length}
            className={`absolute right-0 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-600 transition ${
              currentIndex + customersPerPage >= customers.length &&
              "opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;
