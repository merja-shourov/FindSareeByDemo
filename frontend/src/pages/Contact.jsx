import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();
    setStatus(data.message);

    // Clear fields
    if (response.ok) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Contact <span className="text-pink-400">FindSaree</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            We’d love to hear from you — whether you have questions, feedback,
            or partnership ideas.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-16 grid md:grid-cols-2 gap-12 w-[80%] m-auto">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is always ready to assist you with saree rentals, orders,
            or collaboration inquiries. Reach out to us anytime — we’ll respond
            as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-pink-500 h-6 w-6" />
              <p>Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-pink-500 h-6 w-6" />
              <p>+880 1700-000000</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-pink-500 h-6 w-6" />
              <p>support@findsaree.com</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}

        <form
          className="bg-white shadow-lg p-8 rounded space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Send Message
          </button>
        {status && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {status}
          </p>
        )}
        </form>
        
      </section>

      {/* Map Section */}
      <section className="px-6 md:px-16 pb-16">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Find Us on Map
        </h3>
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="FindSaree Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902003624448!2d90.39945241543122!3d23.75088519462107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c551dfc15d%3A0xb09dd4e0432f26f7!2sDhaka!5e0!3m2!1sen!2sbd!4v1699550000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
