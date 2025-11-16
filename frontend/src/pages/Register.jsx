import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    // console.log(name, email, password);
    const url = "http://localhost:5001/api/auth/registration";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage(data.message || "User registered successfully");

      setTimeout(() => {
        navigate('/login')
      }, 1000);

    } catch (err) {
      setMessage("Unable to connect to server. Please check if the backend is running.");
      console.error("Registration error:", err);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1601987077683-6ec3b94e7e22?auto=format&fit=crop&w=800&q=80')",
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          Create Account 🌸
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium bg-gray-100 px-2 rounded">
            {message}
          </p>
        )}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
