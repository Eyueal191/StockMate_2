// saleApiSummary.js
const saleApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    addSale: { method: "POST", url: "/api/sale/" },
    getSales: { method: "GET", url: "/api/sale/" },
    getSaleById: { method: "GET", url: "/api/sale/:id" },
    updateSale: { method: "PUT", url: "/api/sale/:id" },
    deleteSale: { method: "DELETE", url: "/api/sale/:id" }
  }
};

export default saleApiSummary;
