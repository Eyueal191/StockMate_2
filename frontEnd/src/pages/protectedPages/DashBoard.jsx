import React, { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading.jsx";

const DashBoardHeader = lazy(() => import("../../components/DashBoardHeader.jsx"));
const DashBoardFooter = lazy(() => import("../../components/DashBoardFooter.jsx"));
const CategoryNavBar = lazy(() => import("../../components/bars/CategoryNavBar.jsx"));
const ItemsFilterBar = lazy(() => import("../../components/bars/ItemsFilterBar.jsx"));
const SearchBar = lazy(() => import("../../components/bars/SearchBar.jsx"));
const SaleNavBar = lazy(() => import("../../components/bars/SaleNavBar.jsx"));

function DashBoard() {
  const location = useLocation();

  const isItemsPage =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/items";
  const isCategoriesPage = location.pathname.includes("/categories");
  const isSalesPage =
    location.pathname === "/dashboad/sales" || location.pathname === "/dashboard/sales/add";

  /** ------------------ Pages without sidebar / search ------------------ */
  if (!isItemsPage && !isCategoriesPage && ~isSalesPage) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="h-[15vh] shadow-md bg-white">
          <Suspense fallback={<Loading />}>
            <DashBoardHeader />
          </Suspense>
        </div>

        {/* Content */}
        <main className="flex-1 min-h-[80vh] overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        {/* Footer */}
        <div className="h-[10vh] shadow-inner bg-white">
          <Suspense fallback={<Loading />}>
            <DashBoardFooter />
          </Suspense>
        </div>

      </div>
    );
  }

  /** ------------------ With Sidebar / Search ------------------ */
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">

      {/* Header */}
      <div className="h-[15vh] shadow-md bg-white">
        <Suspense fallback={<Loading />}>
          <DashBoardHeader />
        </Suspense>
      </div>

      {/* Items Page */}
      {isItemsPage && (
        <div className="flex flex-col w-full min-h-[80vh] flex-1">

          {/* MOBILE LAYOUT */}
          <div className="flex flex-col md:hidden w-full flex-1">
            <Suspense fallback={<Loading />}>
              <ItemsFilterBar />
            </Suspense>

            <div className="w-full py-6 px-4 md:px-6">
              <Suspense fallback={<Loading />}>
                <SearchBar />
              </Suspense>
            </div>

            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex md:flex-col w-full flex-1">
            <div className="w-full bg-white shadow-sm border-b border-gray-200 py-6 px-4 md:px-6">
              <Suspense fallback={<Loading />}>
                <SearchBar />
              </Suspense>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex-shrink-0">
                <Suspense fallback={<Loading />}>
                  <ItemsFilterBar />
                </Suspense>
              </div>

              <div className="w-px bg-gray-300" />

              <div className="flex-1 overflow-auto">
                <Outlet />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Categories Page */}
      {isCategoriesPage && (
        <div className="flex flex-col w-full min-h-[80vh] flex-1">

          {/* Mobile */}
          <div className="md:hidden w-full flex-1">
            <Suspense fallback={<Loading />}>
              <CategoryNavBar />
            </Suspense>

            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex w-full flex-1">
            <div className="flex-shrink-0">
              <Suspense fallback={<Loading />}>
                <CategoryNavBar />
              </Suspense>
            </div>

            <div className="w-px bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

        </div>
      )}

      {/* Sales Page */}
      {isSalesPage && (
        <div className="flex flex-col w-full min-h-[80vh] flex-1">

          {/* Mobile */}
          <div className="md:hidden w-full flex-1">
            <Suspense fallback={<Loading />}>
              <SaleNavBar />
            </Suspense>

            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex w-full flex-1">
            <div className="flex-shrink-0">
              <Suspense fallback={<Loading />}>
                <CategoryNavBar />
              </Suspense>
            </div>

            <div className="w-px bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

        </div>
      )}

      {/* Footer */}
      <div className="h-[10vh] shadow-inner bg-white">
        <Suspense fallback={<Loading />}>
          <DashBoardFooter />
        </Suspense>
      </div>

    </div>
  );
}

export default DashBoard;
