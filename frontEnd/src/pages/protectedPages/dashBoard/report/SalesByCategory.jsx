import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the DonutChart
const DonutChart = lazy(() =>
  import("../../../../components/charts/categoryDonutChart.jsx")
);

function SalesByCategory() {
  const [report, setReport] = useState([]);

  // Map backend data to chart labels and values
  const labels = report.map((r) => r.category);
  const dataPoints = report.map((r) => r.sales);

  // Optional: generate colors dynamically
  const colors = [
    "rgba(54, 162, 235, 0.7)",   // Blue
    "rgba(255, 99, 132, 0.7)",   // Pink
    "rgba(255, 206, 86, 0.7)",   // Yellow
    "rgba(75, 192, 192, 0.7)",   // Teal
    "rgba(153, 102, 255, 0.7)",  // Purple
    "rgba(255, 159, 64, 0.7)",   // Orange
    "rgba(199, 199, 199, 0.7)",  // Grey
    "rgba(255, 205, 86, 0.7)",   // Light Yellow
  ];

  const getReport = async () => {
    try {
      const res = await Axios.get("/api/report/sales-by-category");
      if (res.data.success) {
        setReport(res.data.report);
      }
    } catch (error) {
      console.log("Error Message:", error.message);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Sales By Category
      </h2>

      <Suspense fallback={<Loading />}>
        <div className="max-w-4xl mx-auto">
          <DonutChart labels={labels} dataPoints={dataPoints} colors={colors} />
        </div>
      </Suspense>
    </div>
  );
}

export default SalesByCategory;
