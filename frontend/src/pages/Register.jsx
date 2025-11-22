import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);

  // Password validation rules
  const rules = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "At least one number", test: (pw) => /[0-9]/.test(pw) },
    { label: "At least one special character (!@#$%^&*)", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password before sending request
    const allValid = rules.every((rule) => rule.test(password));
    if (!allValid) {
      setMessage("Please fix password errors before submitting.");
      return;
    }

    const userData = { name, email, password };
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
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(
        "Unable to connect to server. Please check if the backend is running."
      );
      console.error("Registration error:", err);
    }

    setName("");
    setEmail("");
    setPassword("");
    setPasswordTouched(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('./Saree.jpg')",
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
            onFocus={() => setPasswordTouched(true)}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Password rules display */}
          {passwordTouched && (
            <ul className="mb-4 text-sm">
              {rules.map((rule, index) => {
                const valid = rule.test(password);
                return (
                  <li
                    key={index}
                    className={`flex items-center ${
                      valid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {valid ? "✔" : "✖"} {rule.label}
                  </li>
                );
              })}
            </ul>
          )}

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
