import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    
    try {
      const url = "http://localhost:5001/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store user data and token in context
        login(data.user, data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => {
          // Redirect based on user role
          if (data.user.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("Something went wrong!");
      console.error("login error", error);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80')",
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          Welcome Back 💖
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
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
            Login
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-700 font-medium">
              {message}
            </p>
          )}
        </form>

        <p className="mt-4 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-pink-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
