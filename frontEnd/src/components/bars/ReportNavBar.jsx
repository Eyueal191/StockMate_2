// src/components/bars/ReportNavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  Box,
  Layers,
  Star,
  AlertCircle,
  Repeat,
  DollarSign,
} from "lucide-react";

function ReportNavBar() {
  const location = useLocation();

  const navItems = [
    { name: "Sales Overview", path: "sales-overview", icon: BarChart2 },
    { name: "Sales by Item", path: "sales-by-item", icon: Box },
    { name: "Sales by Category", path: "sales-by-category", icon: Layers },
    { name: "Top Items", path: "top-items", icon: Star },
    { name: "Low Stock", path: "low-stock", icon: AlertCircle },
    { name: "Sales by Date", path: "sales-by-date", icon: Repeat },
    { name: "Revenue Analytics", path: "revenue-analytics", icon: DollarSign },
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname.endsWith(path);
    return `
      flex items-center justify-center md:justify-start
      rounded-lg font-semibold
      text-[clamp(0.7rem,2vw,1.2rem)]
      transition-all duration-200
      border border-gray-300
      ${
        isActive
          ? "bg-blue-600 text-white shadow-lg border-blue-600"
          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
      }
      px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-3 xl:px-6 xl:py-4
      w-full md:w-auto
      hover:scale-105 active:scale-95 transition-transform duration-150
      gap-1 md:gap-2
      text-left
      whitespace-nowrap
      focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:ring-offset-2 focus:ring-offset-gray-100
    `;
  };

  const getIconSize = () => {
    return `
      w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 
      lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6
    `;
  };

  return (
    <nav
      className="
        flex flex-wrap md:flex-col
        items-center md:items-start
        justify-center md:justify-start
        w-full md:w-auto
        bg-white
        shadow-md md:shadow-none
        border-b md:border-b-0 md:border-r border-gray-200
        p-2 md:px-6 md:py-12
        gap-2
      "
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold text-gray-800 mb-4 w-full text-left flex">
        <span>Reports</span>
        <span className="inline-block mt-5 ml-2 sm:ml-3 md:mt-7 w-24 h-1 md:h-1.5 bg-gray-600 rounded-md"></span>
      </h2>

      {/* Desktop links (>md) */}
      <div className="hidden md:flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
              <span className="flex items-center gap-2">
                <Icon className={getIconSize()} />
                <span>{item.name}</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Tablet layout (<md, two rows) */}
      <div className="hidden sm:flex md:hidden flex-col gap-2 w-full">
        {/* Row 1 */}
        <div className="flex gap-2 w-full justify-between">
          {navItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                <span className="flex items-center gap-1">
                  <Icon className={getIconSize()} /> {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="flex gap-2 w-full justify-between">
          {navItems.slice(3, 7).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                <span className="flex items-center gap-1">
                  <Icon className={getIconSize()} /> {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Small mobile layout (<sm) */}
      <div className="flex flex-col sm:hidden gap-1 w-full">
        {/* Row 1 */}
        <div className="flex gap-2 w-full justify-start">
          {navItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                <span className="flex items-center gap-1">
                  <Icon className={getIconSize()} /> {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="flex gap-2 w-full justify-start">
          {navItems.slice(3, 6).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                <span className="flex items-center gap-1">
                  <Icon className={getIconSize()} /> {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Row 3 */}
        <div className="flex gap-2 w-full justify-start">
          {navItems.slice(6, 7).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                <span className="flex items-center gap-1">
                  <Icon className={getIconSize()} /> {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default ReportNavBar;
