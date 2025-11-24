// reportApiSummary.js
const reportApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    salesByItem: { method: "GET", url: "/api/report/sales-by-item" },
    salesByCategory: { method: "GET", url: "/api/report/sales-by-category" },
    topItems: { method: "GET", url: "/api/report/top-items" },
    lowStockItems: { method: "GET", url: "/api/report/low-stock-items" },
    salesOverview: { method: "GET", url: "/api/report/sales-overview" },
    revenueAnalytics: { method: "GET", url: "/api/report/revenue-analytics" }
  }
};
export default reportApiSummary;
