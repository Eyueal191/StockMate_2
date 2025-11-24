import React from "react";
import logo from "../assets/logo.png";

function DashBoardFooter() {
  return (
    <footer className="bg-gray-800 text-white shadow-inner mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
        {/* Logo */}
        <img
          src={logo}
          alt="StockMate Logo"
          className="h-10 sm:h-12 md:h-16 lg:h-20" // responsive logo
        />

        {/* Company Name */}
        <span className="text-xs sm:text-sm md:text-base lg:text-lg text-center sm:text-left">
          &copy; {new Date().getFullYear()} StockMate. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
export default DashBoardFooter;
