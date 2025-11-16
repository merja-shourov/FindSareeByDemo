import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header-container w-100% bg-[#0D3A3E] py-3 text-white">
      <div className="header w-[80%] m-auto flex items-center justify-between">
        <div className="logo flex justify-center items-center gap-2 text-[#fff]">
          <NavLink to="/">
            <img src="./src/assets/logo.png" width={"50px"} alt="logo" />
          </NavLink>
          <NavLink to="/" className="text-3xl font-bold">
            FindSaree
          </NavLink>
        </div>
        <div className="nav flex justify-center gap-3 uppercase text-[16px] font-semibold">
          <NavLink className="hover:text-pink-600 transition duration-150" to={"/"}>
            Home
          </NavLink>
          <NavLink className="hover:text-pink-600 transition duration-150" to={"/saree"}>
            Saree
          </NavLink>
          <NavLink className="hover:text-pink-600 transition duration-150" to={"/contact"}>
            Contact
          </NavLink>
          <NavLink className="hover:text-pink-600 transition duration-150" to={"/about"}>
            About
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated() ? (
            <>
              <NavLink
                to={user?.isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="px-4 py-2 text-[16px] font-semibold hover:text-pink-600 transition"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-pink-600 text-[16px] font-semibold rounded hover:bg-pink-700 shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to={"/login"}
              className="px-5 py-2 bg-pink-600 text-[16px] font-semibold rounded hover:bg-pink-700 shadow-lg"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
