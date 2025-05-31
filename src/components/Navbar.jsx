import React from "react";
import { Link } from "react-router-dom";  // React Router for navigation

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-semibold hover:text-blue-400">
        WorkForce360
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
