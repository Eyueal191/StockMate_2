// itemApiSummary.js
const itemApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    createItem: { method: "POST", url: "/api/item/" },
    getAllItems: { method: "GET", url: "/api/item/" },
    getItemById: { method: "GET", url: "/api/item/:id" },
    updateItem: { method: "PUT", url: "/api/item/:id" },
    deleteItem: { method: "DELETE", url: "/api/item/:id" }
  }
};

export default itemApiSummary;
