import React, { useContext, lazy, Suspense, useEffect, useState } from "react";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
import Loading from "../../../../components/Loading.jsx";

const FilterSalesByDateBar = lazy(() =>
  import("../../../../components/bars/FilterSalesByDateBar.jsx")
);
const LineChart = lazy(() =>
  import("../../../../components/charts/LineChart.jsx")
);

function SalesByDate() {
  const { saleList } = useContext(StockContext);
  const [salesByDate, setSalesByDate] = useState([]);
  const [loading, setLoading] = useState(true); // start with loading=true

  // Aggregate sales per day
  const getDailyReport = (sales) => {
    const reportMap = {};
    sales.forEach((sale) => {
      const dateKey = new Date(sale.date).toISOString().split("T")[0];
      if (!reportMap[dateKey]) reportMap[dateKey] = 0;
      reportMap[dateKey] += sale.qty || sale.quantity || 1;
    });
    return Object.keys(reportMap)
      .sort()
      .map((date) => ({ date, sales: reportMap[date] }));
  };

  // Update daily report when saleList changes
  useEffect(() => {
    const dailyReport = getDailyReport(saleList || []);
    setSalesByDate(dailyReport);
    setLoading(false); // stop loading after calculation
  }, [saleList]);

  const labels = salesByDate.map((item) => item.date);
  const dataPoints = salesByDate.map((item) => item.sales);

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-12 bg-gray-50">
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-800 mb-8">
        Sales By Date (Daily Trend)
      </h2>

      {/* Filter Bar */}
      <Suspense fallback={<Loading />}>
        <FilterSalesByDateBar />
      </Suspense>

      {/* Chart */}
      <div className="w-full h-[70vh] rounded-2xl shadow-xl bg-white p-6 mt-6 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <LineChart
              labels={labels}
              dataPoints={dataPoints}
              borderColor="rgba(59, 130, 246, 1)"
              backgroundColor="rgba(59, 130, 246, 0.2)"
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default SalesByDate;
