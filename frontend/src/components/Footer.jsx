import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    // <div className='footer w-full bg-[#0D3A3E] py-2 text-center text-white'>
    //   &copy; All right reserved.
    // </div>

    <footer className="bg-[#0D3A3E] text-white py-10">
      <div className="max-w-7xl m-auto mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">FindSaree</h2>
          <p className="text-sm leading-6">
            Rent beautiful sarees for any occasion — weddings, parties, or
            cultural events. Affordable elegance, just a click away.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-pink-600 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/saree" className="hover:text-pink-600 transition">
                Saree Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-pink-600 transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-pink-600 transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="#" className="hover:text-pink-600 transition">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-pink-600 transition">
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-pink-600 transition">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p>
            Email:
            <a
              href="mailto:info@findsaree.com"
              className="text-pink-600 hover:underline"
            >
              info@findsaree.com
            </a>
          </p>
          <p>
            Phone: <span className="text-pink-600">+880 1111-2325</span>
          </p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-pink-600 border-1 p-2 text-xl"> 
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-pink-600 border-1 p-2 text-xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-pink-600 border-1 p-2 text-xl">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-200 mt-10 pt-5 text-center text-sm">
        © {new Date().getFullYear()} FindSaree — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
