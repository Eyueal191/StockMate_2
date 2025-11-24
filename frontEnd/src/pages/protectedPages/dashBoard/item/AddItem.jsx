import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";
import { StockContext } from "../../../../stockContext/StockContext.jsx";

function AddItem() {
  const navigate = useNavigate();

  // SAFELY read context
  const stock = useContext(StockContext) || {};
  const { refetchItemsList, categories = [] } = stock;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      const res = await Axios.post("/api/item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Item added successfully!");
        if (typeof refetchItemsList === "function") await refetchItemsList();

        setTimeout(() => {
          navigate("/dashboard/items");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        toast.error(err.response.data.message || "Item already exists!");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-gray-900 rounded-2xl shadow-xl border border-gray-700 p-8 sm:p-10">
        
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 mb-6 border-b border-gray-700 pb-3">
          Add New Item
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleAdd}>
          
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-200 font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
              className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-gray-200 font-semibold mb-1">
              Price (<span className="text-red-400">Birr</span>):
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              min="0"
              placeholder="Enter price"
              required
              className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-gray-200 font-semibold mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              min="0"
              placeholder="Enter stock quantity"
              required
              className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-200 font-semibold mb-1">Category:</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              required
              className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>Select Category</option>
              {categories.length === 0 ? (
                <option disabled>Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))
              )}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-200 font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              rows={4}
              value={data.description}
              onChange={handleChange}
              placeholder="Enter item description"
              className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-blue-400"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
