// src/pages/admin/SalesOverview.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the LineChart component
const LineChart = lazy(() =>
  import("../../../../components/charts/LineChart.jsx")
);

function SalesOverview() {
  const [salesOverview, setSalesOverview] = useState([]);

  // Map backend data to chart labels and values
  const labels = salesOverview.map((item) => item.month);
  const dataPoints = salesOverview.map((item) => item.sales);

  const getSalesOverview = async () => {
    try {
      const res = await Axios.get("/api/report/sales-overview");
      if (res.data.success) {
        setSalesOverview(res.data.report);
      }
    } catch (error) {
      console.log("Error fetching sales overview:", error.message);
    }
  };

  useEffect(() => {
    getSalesOverview();
  }, []);



  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Sales Overview over months
      </h2>

      {/* Scrollable chart wrapper */}
      <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow bg-white px-4">
        <Suspense fallback={<Loading />}>
          <LineChart
            labels={labels}
            dataPoints={dataPoints}
            borderColor="rgba(54, 162, 235, 1)"
            backgroundColor="rgba(54, 162, 235, 0.2)"
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SalesOverview;
