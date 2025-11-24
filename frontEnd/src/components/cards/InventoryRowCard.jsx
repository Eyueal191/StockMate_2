import React, { useState, useContext } from "react";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";
import { StockContext } from "../../stockContext/StockContext.jsx";

function InventoryRowCard({ product }) {
  if (!product) return null;

  const { _id, name, stock, category } = product;
  const { refetchItemsList } = useContext(StockContext);

  const [stockValue, setStockValue] = useState(stock);
  const [loading, setLoading] = useState(false);

  const handleUpdateStock = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("stock", Number(stockValue));

      const res = await Axios.put(`/api/item/${_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Stock updated!");
        await refetchItemsList();
      } else {
        toast.error(res.data.message || "Update failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update error.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await Axios.delete(`/api/item/${_id}`);
      if (res.data.success) {
        toast.success("Item deleted!");
        await refetchItemsList();
      } else {
        toast.error(res.data.message || "Delete failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion error.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-32 sm:w-24 px-2 py-1 border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none transition disabled:bg-gray-100";

  const stockInputClass =
    "w-20 px-2 py-1 border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none transition disabled:bg-gray-100";

  const buttonClass =
    "px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:bg-blue-400";

  const deleteButtonClass =
    "px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:bg-red-400";

  return (
    <div
      className="
        w-auto
        grid grid-cols-1 gap-3 px-4 py-4 bg-white border border-gray-300 rounded-lg shadow-sm
        lg:grid-cols-2 lg:grid-rows-2 lg:gap-4
        xl:grid-cols-[2fr_1fr_1fr_auto_auto] xl:grid-rows-1 xl:items-center
        hover:ring-2 hover:ring-blue-200 hover:shadow-md
        transition
      "
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">Name:</span>
        <div className="truncate font-medium text-gray-800">{name}</div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1 text-left lg:text-left xl:text-center">
        <span className="text-gray-500 text-sm font-medium">Category:</span>
        <div className="text-gray-600 truncate">{category?.name || "Uncategorized"}</div>
      </div>

      {/* Stock */}
      <div className="flex flex-col gap-1 justify-start lg:justify-start xl:justify-center">
        <span className="text-gray-500 text-sm font-medium">Stock:</span>
        <input
          type="number"
          value={stockValue}
          onChange={(e) => setStockValue(e.target.value)}
          className={stockInputClass}
          min="0"
          disabled={loading}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-row lg:flex-row gap-2 justify-start xl:justify-end mt-2 lg:mt-0 xl:mt-0">
        <button onClick={handleUpdateStock} disabled={loading} className={buttonClass}>
          {loading ? "..." : "Update"}
        </button>
        <button onClick={handleDelete} disabled={loading} className={deleteButtonClass}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default InventoryRowCard;
