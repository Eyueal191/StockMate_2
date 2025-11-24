// src/pages/admin/RevenueAnalytics.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the DonutChart component
const DonutChart = lazy(() =>
  import("../../../../components/charts/DonutChart.jsx")
);

function RevenueAnalytics() {
  const [revenueData, setRevenueData] = useState([]);

  // Map backend data to chart labels and values
  const labels = revenueData.map((item) => item.category);
  const dataPoints = revenueData.map((item) => item.revenue);

  // Optional: generate colors dynamically based on number of categories
  const colors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(199, 199, 199, 0.8)",
    "rgba(255, 99, 255, 0.8)",
    "rgba(0, 128, 0, 0.8)",
  ];

  const getRevenueAnalytics = async () => {
    try {
      const res = await Axios.get("/api/report/revenue-analytics");
      if (res.data.success) {
        setRevenueData(res.data.report);
      }
    } catch (error) {
      console.log("Error fetching revenue analytics:", error.message);
    }
  };

  useEffect(() => {
    getRevenueAnalytics();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Revenue Analytics by Category
      </h2>

      <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow bg-white px-4">
        <Suspense fallback={<Loading />}>
          <DonutChart labels={labels} dataPoints={dataPoints} colors={colors} />
        </Suspense>
      </div>
    </div>
  );
}

export default RevenueAnalytics;
