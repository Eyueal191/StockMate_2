import React, { useState, useEffect, useContext } from "react";
import Axios from "../../axios/axios.config.js";
import { Tag, Filter } from "lucide-react";
import { StockContext } from "../../stockContext/StockContext.jsx";
import Loading from "../../components/Loading.jsx"
function ItemsFilterBar() {
  const { selectedCategories, setSelectedCategories } = useContext(StockContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const iconSize = "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7";

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Axios.get("/api/category/categories");
      if (res?.data?.success) {
        setCategories(res.data.categories || []);
      } else {
        setError("Failed to fetch categories.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e, catName) => {
    const checked = e.target.checked;
    if (catName === "") {
      setSelectedCategories([]);
    } else if (checked) {
      setSelectedCategories((prev) => [...prev, catName]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== catName));
    }
  };

  const allCategories = [{ _id: "all", name: "" }, ...categories];
 if(categories.length===0) return <Loading/>
  return (
    <div
      className={`
        flex flex-col p-3 sm:p-5 md:p-6 bg-white shadow-xl border border-gray-200 rounded-lg
        transition-all duration-300
        ${showFilter ? "min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]" : "min-h-[80px]"}
      `}
    >
      {/* Mobile toggle button - Updated background to bg-gray-200 and text to blue */}
      <button
        className="md:hidden mb-4 px-4 py-2 bg-gray-200 text-blue-600 rounded-md shadow-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition"
        onClick={() => setShowFilter(!showFilter)}
      >
        <Filter className={iconSize} />
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>

      {/* Filter content */}
      <aside className={`${showFilter ? "block" : "hidden"} md:block`}>
        {/* Sidebar Title */}
        <div className="flex items-center mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mr-2">
            Filter
          </h2>
          <div className="h-1 bg-blue-400 rounded-full mt-4 w-16"></div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-gray-500 mb-2">Loading categories...</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Categories */}
        {!loading && !error && (
          <div className="flex flex-col gap-2">
            {allCategories.map((cat) => {
              const isActive = cat.name === ""
                ? selectedCategories.length === 0
                : selectedCategories.includes(cat.name);

              return (
                <label
                  key={cat._id}
                  className={`
                    flex items-center gap-2 px-4 py-2 
                    transition-all 
                    cursor-pointer shadow-sm select-none
                    rounded-md focus-within:ring-2 focus-within:ring-blue-300
                    focus-within:ring-offset-1
                    ${isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700" // Active state is blue
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Non-active is bg-gray-200
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className={`form-checkbox h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-white' : 'text-blue-600'}`}
                    checked={isActive}
                    onChange={(e) => handleChange(e, cat.name)}
                  />
                  <Tag className={iconSize} />
                  <span className="text-sm sm:text-base md:text-lg font-medium">
                    {cat.name === "" ? "All" : cat.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
export default ItemsFilterBar;