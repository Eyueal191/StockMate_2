// src/pages/Account.jsx
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { User, Shield, Settings } from "lucide-react";

function Account() {
  const location = useLocation();
  const isCurrentUserAdmin = localStorage.getItem("Admin");

  const getLinkClass = (path) => {
    const isActive =
      path === "/dashboard/account"
        ? location.pathname === "/dashboard/account" || location.pathname === "/dashboard/account/"
        : location.pathname === path;

    return `
      flex items-center gap-2 rounded-lg font-semibold
      text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
      transition-all duration-200
      px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4
      ${isActive ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}
      focus:ring-2 focus:ring-blue-400
      justify-center md:justify-start
      w-full
    `;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* 1️⃣ <sm – Mobile: Two Rows Grid */}
      <nav className="grid grid-cols-2 gap-3 p-3 bg-white shadow-md sm:hidden">
        <NavLink to="" end className={getLinkClass("/dashboard/account")}>
          <User className="h-5 w-5" />
          <span className="truncate">Profile</span>
        </NavLink>
        <NavLink to="security" className={getLinkClass("/dashboard/account/security")}>
          <Shield className="h-5 w-5" />
          <span className="truncate">Security</span>
        </NavLink>
        {isCurrentUserAdmin && (
          <NavLink to="admin-management" className={`${getLinkClass("/dashboard/account/admin-management")} col-span-2`}>
            <Settings className="h-5 w-5" />
            <span className="truncate">Admin Management</span>
          </NavLink>
        )}
      </nav>

      {/* 2️⃣ sm to md – Small Tablets: Horizontal Row */}
      <nav className="hidden sm:flex md:hidden justify-around gap-6 p-4 bg-white shadow-md">
        <NavLink to="" end className={getLinkClass("/dashboard/account")}>
          <User className="h-5 w-5" />
          <span className="truncate">Profile</span>
        </NavLink>
        <NavLink to="security" className={getLinkClass("/dashboard/account/security")}>
          <Shield className="h-5 w-5" />
          <span className="truncate">Security</span>
        </NavLink>
        {isCurrentUserAdmin && (
          <NavLink to="admin-management" className={getLinkClass("/dashboard/account/admin-management")}>
            <Settings className="h-5 w-5" />
            <span className="truncate">Admin Management</span>
          </NavLink>
        )}
      </nav>

      {/* 3️⃣ >md – Desktop: Vertical Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-80 bg-white shadow-md border-r border-gray-200 px-6 gap-4 py-12">
        <NavLink to="" end className={getLinkClass("/dashboard/account")}>
          <User className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
          <span className="truncate">Profile</span>
        </NavLink>
        <NavLink to="security" className={getLinkClass("/dashboard/account/security")}>
          <Shield className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
          <span className="truncate">Security</span>
        </NavLink>
        {isCurrentUserAdmin && (
          <NavLink to="admin-management" className={getLinkClass("/dashboard/account/admin-management")}>
            <Settings className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
            <span className="truncate">Admin Management</span>
          </NavLink>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-18rem)] p-6 md:p-8 bg-gray-50 text-gray-900">
        <Outlet />
      </main>
    </div>
  );
}

export default Account;
