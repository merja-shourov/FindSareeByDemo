import { Sparkles, Heart, Clock, Leaf } from "lucide-react";
import { NavLink } from "react-router";
import AboutImage from "../assets/contact.jpg";
export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${AboutImage})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-pink-400">FindSaree</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Your one-stop destination to rent beautiful sarees for every occasion —
            without breaking the bank.
          </p>
        </div>
      </section>

      {/* Story area */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          <span className="font-semibold text-pink-500">FindSaree</span> was
          created with a simple idea — make traditional fashion accessible to
          everyone. We understand that sarees are not just clothes, but
          memories, elegance, and identity. Whether it’s a wedding, party, or
          festive occasion, we bring you the latest designer sarees for rent —
          easy, affordable, and sustainable.
        </p>
      </section>

      
      <section className="py-16 bg-white px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Choose Us
        </h2>
        <div className="grid gap-8 md:grid-cols-4 text-center">
          <FeatureCard
            icon={<Sparkles className="h-10 w-10 text-pink-500 mx-auto mb-4" />}
            title="Trendy Designs"
            description="Get access to the latest and premium saree collections for every style."
          />
          <FeatureCard
            icon={<Heart className="h-10 w-10 text-pink-500 mx-auto mb-4" />}
            title="Affordable Luxury"
            description="Rent your dream saree for a fraction of the retail price."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-pink-500 mx-auto mb-4" />}
            title="Quick & Easy"
            description="Simple online booking and fast doorstep delivery."
          />
          <FeatureCard
            icon={<Leaf className="h-10 w-10 text-pink-500 mx-auto mb-4" />}
            title="Eco-Friendly Fashion"
            description="Promote sustainability by reusing fashion responsibly."
          />
        </div>
      </section>

      
      <section className="bg-pink-500 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Rent Your Dream Saree Today ✨
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Explore hundreds of designs, book in minutes, and dazzle at your next
          event.
        </p>
        <button className="bg-white text-pink-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
          <NavLink to="/saree">Explore Collection</NavLink> 
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
      {icon}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}