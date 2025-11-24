import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the VerticalBarChart
const VerticalBarChart = lazy(() =>
  import("../../../../components/charts/VericalBarChart.jsx")
);

function SalesByItem() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    try {
      const res = await Axios.get("/api/report/sales-by-item");
      if (res.data.success && Array.isArray(res.data.report)) {
        // Filter out invalid items
        const filtered = res.data.report.filter(
          (item) =>
            item.name &&
            item.name.trim() !== "" &&
            typeof item.sale === "number" &&
            item.sale > 0
        );
        setReport(filtered);
      }
    } catch (error) {
      console.error("Error fetching sales by item:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  const chartLabels = report.map((r) => r.name);
  const chartValues = report.map((r) => r.sale);

  return (
    <div className="w-full h-full p-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Sales By Item
      </h2>

      <div className="w-full max-h-[80vh] overflow-x-auto overflow-y-auto rounded-2xl shadow bg-white p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : chartLabels.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            No sales data to display.
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <VerticalBarChart
              labels={chartLabels}
              values={chartValues}
              title="Sales by Item"
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default SalesByItem;
