// src/components/bars/SaleNavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, List } from "lucide-react";

function SaleNavBar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      flex items-center gap-2 sm:gap-3 rounded-lg font-semibold
      text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem]
      transition-all duration-200
      ${isActive ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}
      px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-3 xl:px-6 xl:py-4
    `;
  };

  return (
    <nav className="w-full md:w-64 bg-white shadow-md md:shadow-none border-b md:border-b-0 md:border-r border-gray-200 p-2 md:p-4">
      
      {/* Title */}
      {/* <md screens: scaled h1 */}
      <div className="md:hidden mb-4 flex mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-3 mx-auto">
          <span>Sale Management</span> 
          <span className="w-20 h-1 mt-4 bg-gray-400 rounded-full"></span>
        </h1>
      </div>

      {/* Desktop >=md layout: scaled h2 */}
      <h2 className="hidden md:block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Sales Management
      </h2>

      {/* Mobile <md layout: buttons side by side with minimal gap */}
      <div className="flex md:hidden justify-center gap-[2px] mb-4">
        <Link
          to="/dashboard/sales"
          className={`${getLinkClass("/dashboard/sales")} w-[120px] flex justify-center`}
        >
          <List className="h-5 w-5" />
          <span className="truncate ml-1">Sale</span>
        </Link>

        <Link
          to="/dashboard/sales/add"
          className={`${getLinkClass("/dashboard/sales/add")} w-[120px] flex justify-center`}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="truncate ml-1">Add</span>
        </Link>
      </div>

      {/* Desktop >=md layout: vertical buttons */}
      <div className="hidden md:flex flex-col gap-4">
        <Link
          to="/dashboard/sales"
          className={`${getLinkClass("/dashboard/sales")}`}
        >
          <List className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
          <span className="truncate ml-2">Sales History</span>
        </Link>

        <Link
          to="/dashboard/sales/add"
          className={`${getLinkClass("/dashboard/sales/add")}`}
        >
          <PlusCircle className="h-5 w-5 md:h-6 lg:h-7 xl:h-8" />
          <span className="truncate ml-2">Add New Sale</span>
        </Link>
      </div>
    </nav>
  );
}

export default SaleNavBar;
