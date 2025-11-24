import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";


// Lazy load the VerticalBarChart
const VerticalBarChart = lazy(() =>
  import("../../../../components/charts/VericalBarChart.jsx")
);

function TopItems() {
  const [report, setReport] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch report from backend
  const getReport = async () => {
    try {
      const res = await Axios.get("/api/report/top-items");
      if (res.data.success && Array.isArray(res.data.report)) {
        // Filter out invalid entries
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
      console.error("Error fetching top items:", error.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  // Build labels and values together from filtered report
  const chartData = report.reduce(
    (acc, item) => {
      acc.labels.push(item.name);
      acc.values.push(item.sale);
      return acc;
    },
    { labels: [], values: [] }
  );

  const title = "Top Selling Products by Quantity";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Top Sale Items
      </h2>

      <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow bg-white px-4">
        {loadingData ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : chartData.labels.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            No top-selling items to display.
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <VerticalBarChart
              labels={chartData.labels}
              values={chartData.values}
              title={title}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default TopItems;
