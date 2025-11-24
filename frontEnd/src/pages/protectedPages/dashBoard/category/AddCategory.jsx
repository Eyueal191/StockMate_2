import React, { useState } from "react";
import Axios from "../../../../axios/axios.config.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react";

function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name cannot be empty");

    setLoading(true);
    try {
      const res = await Axios.post("/api/category/categories", { name });
      if (res.status === 201 && res.data.success) {
        toast.success(res.data.message || "Category created successfully!");
        navigate("/dashboard/categories");
      } else {
        toast.error(res.data.message || "Failed to create category.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
       setTimeout(() => {
          navigate("/dashboard/categories");
        }, 2000)
      } else {
        toast.error(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[79vh] bg-gray-300 flex items-center justify-center p-4 sm:p-6">
      {/* Centered and lowered Toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: "80px" }} // slightly lower
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#ffffff", // white background
            color: "#111827",      // dark text
            fontSize: "16px",      // larger text
            fontWeight: "600",
            padding: "16px 24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200 flex flex-col justify-center">
        
        {/* Artistic Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Box className="w-10 h-10 text-blue-500 animate-bounce" />
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center sm:text-left">
              Add New Category
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-1 text-center sm:text-left">
              Create a new category to organize your items efficiently.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full">
            <label className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mb-1 md:mb-0 min-w-[120px]">
              Category Name:
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 text-green-600 border border-gray-300 rounded-xl px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm w-full transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 sm:py-3 md:py-4 rounded-xl bg-blue-600 text-white font-semibold transition transform hover:bg-blue-700 active:scale-95 shadow flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <Box className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddCategory;
