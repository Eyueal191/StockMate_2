import React, { useState, useEffect, lazy, Suspense } from "react";
import Axios from "../../../../axios/axios.config.js";
import { ClipboardList } from "lucide-react"; // scalable icon
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading.jsx";

const CategoryCard = lazy(() =>
  import("../../../../components/cards/categoryCard.jsx")
);
const CategoriesList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Axios.get("/api/category/categories");
      if (res?.data?.success) {
        setCategories(res.data.categories);
      } else {
        setError("Failed to fetch categories.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
if(categories.length===0) return <Loading/>
  return (
    <div className="h-full w-full bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      <div className="bg-white shadow-2xl rounded-2xl w-[90%] max-w-[90%] p-6 sm:p-10 lg:p-12">
        {/* Artistic Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 border-b-2 border-gray-200 pb-6 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Scalable icon */}
            <ClipboardList className="text-green-500 animate-bounce w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight tracking-tight">
                Category Management
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
                Organize, add, or edit your categories efficiently.
              </p>
            </div>
          </div>

          {/* Add Category Button */}
          <button
            onClick={() => navigate("add")}
            className="mt-4 lg:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 md:py-3 px-4 sm:px-6 md:px-6 rounded-xl flex items-center gap-2 sm:gap-3 md:gap-3 transition transform hover:scale-105 duration-300 shadow-lg"
          >
            <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-sm sm:text-base md:text-lg">Add Category</span>
          </button>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-gray-500 text-center py-12 animate-pulse text-lg sm:text-xl">
            Loading categories...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-12 text-lg sm:text-xl">
            {error}
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              <Suspense fallback={<div>Loading categories...</div>}>
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="transition transform hover:scale-105 motion-reduce:transform-none animate-fadeIn shadow-lg rounded-xl"
                  >
                    <CategoryCard category={cat} />
                  </div>
                ))}
              </Suspense>
            ) : (
              <div className="col-span-full text-gray-500 text-center py-12 text-lg sm:text-xl">
                No categories found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoriesList;
