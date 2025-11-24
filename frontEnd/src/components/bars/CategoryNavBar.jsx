// src/components/bars/CategoryNavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, List } from "lucide-react";

function CategoryNavBar() {
  const location = useLocation();

  const navItems = [
    { name: "Add Category", icon: PlusCircle, path: "/dashboard/categories/add" },
    { name: "Category List", icon: List, path: "/dashboard/categories" },
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `
      flex items-center gap-2 rounded-lg font-semibold
      text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
      transition-all duration-200

      ${isActive ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}

      /* Smooth padding scale */
      px-2 py-1           /* smallest screens */
      sm:px-3 sm:py-2
      md:px-4 md:py-3     /* >= md original padding */
      lg:px-5 lg:py-3
      xl:px-6 xl:py-4
    `;
  };

  return (
    <nav
      className="
        flex flex-row md:flex-col
        items-center md:items-start
        justify-center md:justify-start

        w-full md:w-64
        bg-white
        shadow-md md:shadow-none
        border-b md:border-r border-gray-200
        p-2 md:p-4
        gap-2
      "
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              ${getLinkClass(item.path)}

              /* Width logic */
              w-auto md:w-full      /* horizontal on <md, vertical full width on >=md */
              justify-center md:justify-start

              hover:scale-105 active:scale-95
              transition-transform duration-150
            `}
          >
            <Icon className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default CategoryNavBar;
