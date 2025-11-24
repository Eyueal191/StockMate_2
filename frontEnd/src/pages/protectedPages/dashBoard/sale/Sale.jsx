// src/pages/protectedPages/dashBoard/sale/Sale.jsx
import React, { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../../../../components/Loading.jsx";

const SaleSearchBar = lazy(() => import("../../../../components/bars/SaleSearchBar"));
const SaleNavBar = lazy(() => import("../../../../components/bars/SaleNavBar"));
const FilterSalesByDateBar = lazy(() => import("../../../../components/bars/FilterSalesByDateBar.jsx"));

function Sale() {
  const location = useLocation();
  const isSaleListPage = location.pathname === "/dashboard/sales";

  return (
    <div className="flex flex-col w-screen bg-gray-100 min-h-screen">

      {/* Top SearchBar (Desktop >md) */}
      {isSaleListPage &&
        <div className="hidden md:flex justify-center w-full py-4 bg-white shadow-sm rounded-lg py-8 border border-gray-300 shadow-sm">
          <Suspense fallback={<div className="h-12 bg-gray-200 rounded animate-pulse w-full max-w-6xl" />} >
            <SaleSearchBar />
          </Suspense>
        </div>
      }

      {/* Desktop layout (>md) */}
      <div className="hidden md:flex flex-1 w-full">

        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm overflow-y-auto">
          <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse" />} >
            <SaleNavBar />
          </Suspense>
        </aside>

        {/* Right column: Filter + Outlet */}
        <div className="flex flex-col flex-1 gap-4 bg-gray-50">

          {/* FilterSalesByDateBar centered */}
          {isSaleListPage &&
            <div className="flex justify-center">
              <Suspense fallback={<div className="h-12 bg-gray-200 rounded animate-pulse w-full max-w-3xl" />} >
                <FilterSalesByDateBar />
              </Suspense>
            </div>
          }

          {/* Main Outlet */}
          <main className="flex-1 bg-white rounded-xl shadow-sm overflow-auto">
            <Outlet />
          </main>
        </div>

      </div>

      {/* Mobile layout (<md) */}
      <div className="flex flex-col md:hidden w-full space-y-4">

        {/* Sidebar Nav */}
        <div className="bg-white shadow-sm rounded-lg">
          <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse" />} >
            <SaleNavBar />
          </Suspense>
        </div>

        {/* SearchBar below NavBar */}
        {isSaleListPage &&
          <div className="bg-white shadow-sm rounded-lg flex justify-center py-4">
            <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse w-full" />} >
              <SaleSearchBar />
            </Suspense>
          </div>
        }

        {/* FilterBar */}
        {isSaleListPage &&
          <div className="bg-white shadow-sm rounded-lg flex justify-center">
            <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse w-full" />} >
              <FilterSalesByDateBar />
            </Suspense>
          </div>
        }

        {/* Main content */}
        <main className="bg-white shadow-sm rounded-lg w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Sale;
