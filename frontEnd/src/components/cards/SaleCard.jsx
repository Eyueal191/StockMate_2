import React, { useContext, useState } from "react";
import { StockContext } from "../../stockContext/StockContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../axios/axios.config.js";
import { ImageOff } from "lucide-react";

function SaleCard({ sale }) {
  const navigate = useNavigate();
  const { refetchSaleList } = useContext(StockContext);
  const [loading, setLoading] = useState(false);

  // Delete sale handler
  const deleteHandler = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await Axios.delete(`/api/sale/${sale._id}`);
      if (res.data.success) {
        toast.success("Sale deleted successfully!");
        await refetchSaleList();
        setTimeout(() => navigate("/dashboard/sales"), 2000);
      } else {
        toast.error(res.data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading placeholder if sale or item not loaded
  if (!sale || !sale.item) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 rounded-xl">
        <ImageOff className="w-16 h-16 text-gray-400" />
      </div>
    );
  }

  const { _id, name, description, image } = sale.item;

  return (
    <div
      className="
        bg-white shadow-lg rounded-2xl overflow-hidden
        flex flex-col
        w-full max-w-[440px] aspect-square
        p-4
        transition-shadow duration-300
        hover:shadow-2xl
        mx-auto
        h-[500px]
      "
    >
      {/* Sale Item Image */}
      <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 rounded-t-2xl overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Sale Details */}
      <div className="flex flex-col flex-1 mt-3 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 line-clamp-1">
            {name}
          </h2>
          {description && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-blue-600 font-medium text-sm sm:text-base md:text-lg">
            Seller: {sale.seller}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            Date: {new Date(sale.date).toLocaleDateString()}
          </p>
          <p className="text-green-600 font-medium text-sm sm:text-base md:text-lg">
            Quantity: {sale.quantity}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4 gap-3">
          <button
            className="flex-1 py-2 px-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg"
            onClick={() => navigate(`/dashboard/sales/edit/${sale._id}`)}
          >
            Update
          </button>
          <button
            className="flex-1 py-2 px-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg"
            onClick={deleteHandler}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleCard;
