// categoryApiSummary.js
const categoryApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    createCategory: { method: "POST", url: "/api/category/categories" },
    getAllCategories: { method: "GET", url: "/api/category/categories" },
    getCategoryById: { method: "GET", url: "/api/category/categories/:id" },
    updateCategory: { method: "PUT", url: "/api/category/categories/:id" },
    deleteCategory: { method: "DELETE", url: "/api/category/categories/:id" }
  }
};

export default categoryApiSummary;
