import React, { useState, useContext } from "react";
import { StockContext } from "../../stockContext/StockContext.jsx";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";

function SaleRowCard({ sale }) {
  if (!sale || !sale.item) return null;

  const { _id, name } = sale.item;
  const { seller: initialSeller, date: initialDate, quantity } = sale;
  const { refetchSaleList } = useContext(StockContext);

  const [quantityValue, setQuantityValue] = useState(quantity);
  const [dateValue, setDateValue] = useState(
    initialDate ? new Date(initialDate).toISOString().split("T")[0] : ""
  );
  const [sellerValue, setSellerValue] = useState(initialSeller || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const payload = {
        quantity: Number(quantityValue),
        date: dateValue,
        seller: sellerValue,
      };
      const res = await Axios.put(`/api/sale/${_id}`, payload);
      if (res.data.success) {
        toast.success("Sale updated!");
        await refetchSaleList();
      } else toast.error(res.data.message || "Update failed.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await Axios.delete(`/api/sale/${_id}`);
      if (res.data.success) {
        toast.success("Sale deleted!");
        await refetchSaleList();
      } else toast.error(res.data.message || "Delete failed.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-32 sm:w-28 px-2 py-1 border border-gray-400 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none transition disabled:bg-gray-100";

  const buttonClass =
    "w-32 sm:w-24 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:bg-blue-400";

  const deleteButtonClass =
    "w-32 sm:w-24 px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:bg-red-400";

  return (
    <div
      className="
        w-auto
        grid grid-cols-1 gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm
        lg:grid-cols-2 lg:grid-rows-2 lg:gap-4
        xl:grid-cols-[2fr_1fr_1fr_auto_auto] xl:grid-rows-1 xl:items-center
        hover:ring-2 hover:ring-blue-200 hover:shadow-md
        transition
      "
    >
      {/* Item Name */}
      <div className="truncate font-medium text-gray-800">
        <label className="block text-sm font-semibold text-gray-600">
          Item:
        </label>
        {name}
      </div>

      {/* Seller */}
      <div className="text-gray-600 truncate text-left lg:text-left xl:text-center">
        <label className="block text-sm font-semibold text-gray-600">
          Seller:
        </label>
        <input
          type="text"
          value={sellerValue}
          onChange={(e) => setSellerValue(e.target.value)}
          disabled={loading}
          placeholder="Seller"
          className={inputClass}
        />
      </div>

      {/* Date */}
      <div className="text-gray-600 truncate text-left lg:text-left xl:text-center">
        <label className="block text-sm font-semibold text-gray-600">
          Date:
        </label>
        <input
          type="date"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          disabled={loading}
          className={inputClass}
        />
      </div>

      {/* Quantity */}
      <div className="flex justify-start lg:justify-start xl:justify-center">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-600">
            Quantity:
          </label>
          <input
            type="number"
            value={quantityValue}
            onChange={(e) => setQuantityValue(e.target.value)}
            disabled={loading}
            placeholder="Quantity"
            min="0"
            className={inputClass}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row lg:flex-row gap-2 justify-start xl:justify-end mt-2 lg:mt-0 xl:mt-0">
        <button onClick={handleUpdate} disabled={loading} className={buttonClass}>
          {loading ? "..." : "Update"}
        </button>
        <button onClick={handleDelete} disabled={loading} className={deleteButtonClass}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default SaleRowCard;
