// src/pages/protectedPages/dashBoard/report/Reports.jsx
import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const ReportNavBar = lazy(() => import("../../../../components/bars/ReportNavBar.jsx"));

function Reports() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* Mobile Layout (<md) */}
      <div className="w-full md:hidden flex flex-col">
        <header className="w-full">
          <Suspense fallback={<div>Loading Navbar...</div>}>
            <ReportNavBar />
          </Suspense>
        </header>
        <main className="w-full flex-1">
          <Outlet />
        </main>
      </div>

      {/* Desktop & Tablet Layout (>=md) */}
      <div className="hidden md:flex w-full min-h-screen">
        {/* Sidebar */}
        <aside className="w-84 bg-white border border-gray-200 min-h-screen">
          <Suspense fallback={<div>Loading Navbar...</div>}>
            <ReportNavBar />
          </Suspense>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default Reports;
