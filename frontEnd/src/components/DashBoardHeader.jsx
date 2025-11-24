import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User } from "lucide-react"; // <-- added User icon
import logo from "../assets/logo.png";
import Axios from "../axios/axios.config.js";

function DashBoardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const logOut = async () => {
    try {
      const res = await Axios.get("/api/user/logout");

      if (res.data.success) {
        localStorage.removeItem("IsLoggedIn");
        localStorage.removeItem("userId");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getLinkClass = (path) =>
    `px-4 py-2 rounded-md transition-all duration-200 
     text-sm sm:text-base md:text-lg lg:text-xl 
     text-white tracking-wide
     hover:bg-gray-700/70 hover:text-blue-300
     focus:outline-none focus:ring-2 focus:ring-blue-500/60 
     border-b-2 ${
       location.pathname === path
         ? "border-blue-400 font-semibold text-blue-300"
         : "border-transparent"
     }`;

  const getItemsLinkClass = () => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const active = ["/dashboard", "/dashboard/items"].includes(currentPath);

    return `px-4 py-2 rounded-md transition-all duration-200 
      text-sm sm:text-base md:text-lg lg:text-xl 
      text-white tracking-wide
      hover:bg-gray-700/70 hover:text-blue-300
      focus:outline-none focus:ring-2 focus:ring-blue-500/60 
      border-b-2 ${
        active ? "border-blue-400 font-semibold text-blue-300" : "border-transparent"
      }`;
  };

  return (
    <header className="bg-gray-900 shadow-lg shadow-black/20 sticky top-0 z-50">
      <nav className="flex items-center justify-between 
        h-24 sm:h-28 md:h-32 
        px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-md 
              hover:bg-gray-700/70 transition 
              focus:ring-2 focus:ring-blue-500/60"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>

          <div className="flex-shrink-0">
            <NavLink to="/dashboard/items">
              <img
                src={logo}
                alt="StockMate Logo"
                className="h-12 sm:h-16 md:h-20 drop-shadow-lg"
              />
            </NavLink>
          </div>
        </div>

        {/* DESKTOP CENTER LINKS */}
        <div className="hidden md:flex flex-1 justify-center items-center 
          max-w-4xl gap-10 xl:gap-12 2xl:gap-14">
  
          <NavLink to="/dashboard/reports" className={getLinkClass("/dashboard/reports")}>
            Report
          </NavLink>

          <NavLink to="/dashboard/items" className={getItemsLinkClass()}>
            Items
          </NavLink>

          <NavLink to="/dashboard/sales" className={getLinkClass("/dashboard/sales")}>
            Sales
          </NavLink>

          <NavLink to="/dashboard/categories" className={getLinkClass("/dashboard/categories")}>
            Category
          </NavLink>
        </div>

        {/* RIGHT SECTION (Account + Logout) */}
        <div className="flex items-center gap-4">

          {/* ✅ Account Link with User Icon */}
          <NavLink
            to="/dashboard/account"
            className={getLinkClass("/dashboard/account")}
          >
            <div className="flex items-center gap-1">
              <User size={18} /> {/* User icon */}
              <span>Account</span>
            </div>
          </NavLink>

          {/* Logout */}
          <button
            onClick={logOut}
            className="flex items-center gap-1 
              bg-red-600 px-3 py-2 rounded-md 
              hover:bg-red-700 hover:scale-[1.03]
              transition-all duration-200
              text-sm sm:text-base md:text-lg lg:text-xl text-white
              shadow-md shadow-red-900/40
              focus:outline-none focus:ring-2 focus:ring-red-500/60"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 
            flex flex-col gap-3 p-4 md:hidden z-50 
            border-t border-gray-700 shadow-inner">

            <NavLink
              to="/dashboard/reports"
              className={getLinkClass("/dashboard/reports")}
              onClick={() => setMobileOpen(false)}
            >
              Report
            </NavLink>

            <NavLink
              to="/dashboard/items"
              className={getItemsLinkClass()}
              onClick={() => setMobileOpen(false)}
            >
              Items
            </NavLink>

            <NavLink
              to="/dashboard/sales"
              className={getLinkClass("/dashboard/sales")}
              onClick={() => setMobileOpen(false)}
            >
              Sales
            </NavLink>

            <NavLink
              to="/dashboard/categories"
              className={getLinkClass("/dashboard/categories")}
              onClick={() => setMobileOpen(false)}
            >
              Category
            </NavLink>

            {/* ✅ Account with icon in mobile menu */}
            <NavLink
              to="/dashboard/account"
              className={getLinkClass("/dashboard/account")}
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center gap-1">
                <User size={18} />
                <span>Account</span>
              </div>
            </NavLink>

            {/* Logout mobile */}
            <button
              onClick={() => {
                logOut();
                setMobileOpen(false);
              }}
              className="flex items-center justify-center gap-1 
                bg-red-600 px-3 py-2 rounded-md 
                hover:bg-red-700 hover:scale-[1.03]
                transition-all duration-200
                text-sm sm:text-base md:text-lg lg:text-xl text-white
                shadow-md shadow-red-900/40
                focus:outline-none focus:ring-2 focus:ring-red-500/60"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
export default DashBoardHeader;
