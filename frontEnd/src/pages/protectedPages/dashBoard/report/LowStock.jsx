import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the VerticalBarChart
const VerticalBarChart = lazy(() =>
  import("../../../../components/charts/VericalBarChart.jsx") // corrected typo
);

function LowStock() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLowStockItems = async () => {
    try {
      const res = await Axios.get("/api/report/low-stock-items");
      if (res.data.success && Array.isArray(res.data.lowStockItems)) {
        // Filter out invalid items
        const filtered = res.data.lowStockItems.filter(
          (item) =>
            item.name &&
            item.name.trim() !== "" &&
            typeof item.stock === "number" &&
            item.stock > 0
        );
        setLowStockItems(filtered);
      }
    } catch (error) {
      console.error("Error fetching low stock items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLowStockItems();
  }, []);

  const labels = lowStockItems.map((item) => item.name);
  const values = lowStockItems.map((item) => item.stock);
  const title = "Low Stock Products";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Low Stock Items
      </h2>

      <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow bg-white px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : labels.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            No low stock items to display.
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <VerticalBarChart labels={labels} values={values} title={title} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default LowStock;
