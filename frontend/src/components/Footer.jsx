// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-700">
    <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Brand / Logo */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-3">Subhas Praanik</h1>
        <p className="text-sm text-gray-400">
          Empowering students with the best scholarship opportunities.
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="hover:text-white transition"><FaFacebook /></a>
          <a href="#" className="hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-white transition">Home</Link></li>
          <li><Link to="/scholarships" className="hover:text-white transition">Scholarships</Link></li>
          <li><Link to="/blogs" className="hover:text-white transition">Blogs</Link></li>
          <li><Link to="/aboutus" className="hover:text-white transition">About Us</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
        <p className="text-sm text-gray-400">Email: support@subhaspramanik.com</p>
        <p className="text-sm text-gray-400">Phone: +91 0000000000</p>
        <p className="text-sm text-gray-400">Location: Kolkata, India</p>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="text-center mt-10 border-t border-gray-700 pt-6 text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Subhas Pramanik. All rights reserved.
    </div>
  </footer>
);

export default Footer;
