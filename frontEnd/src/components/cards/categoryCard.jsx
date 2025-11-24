import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full h-full                 /* fill the grid cell */
        bg-white
        shadow-lg
        rounded-lg
        p-4 sm:p-5 md:p-6
        flex flex-col justify-between
        transition transform hover:shadow-xl hover:-translate-y-1
        border border-gray-200
      "
    >
      {/* Category Name */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
        {category.name}
      </h2>

      {/* Edit Button */}
      <div className="flex justify-center md:justify-start mt-auto">
        <button
          onClick={() => navigate(`edit/${category._id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm sm:text-base md:text-base transition duration-200 w-full sm:w-auto"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
