import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading.jsx";
import { StockContext } from "../../../../stockContext/StockContext.jsx";

function AddSale() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.items.list) || [];

  const {refetchSaleList } = useContext(StockContext); 
  const [data, setData] = useState({
    name: "",
    quantity: "",
    seller: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!data.name) {
      toast.error("Please select a product");
      return;
    }

    try {
      setLoading(true);
      const res = await Axios.post("/api/sale", data);

      if (res.data.success) {
        toast.success("Sale added successfully!");
        await refetchSaleList()
        setTimeout(()=>
        navigate("/dashboard/sales"),1000)
      } else {
        toast.error(res.data.message || "Add failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-50">
      {loading && <Loading message="Processing sale..." />}
      <div className="w-full py-12 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="border w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-2xl border-gray-400 p-6 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-100 mb-6 border-b border-gray-700 pb-2">
            Record a New Sale
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleAdd}>

            {/* Product Name Dropdown */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1">Item Name:</label>
              <select
                name="name"
                value={data.name}
                onChange={handleChange}
                className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
                disabled={loading || products.length === 0}
              >
                <option value="" disabled>
                  Select a product
                </option>
                {products.map((product) => (
                  <option key={product._id || product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={data.quantity}
                placeholder="Insert sold item's quantity"
                onChange={handleChange}
                min="1"
                required
                disabled={loading}
                className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            {/* Seller */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1">Seller:</label>
              <input
                type="text"
                name="seller"
                value={data.seller}
                placeholder="Insert seller's name"
                onChange={handleChange}
                disabled={loading}
                className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            {/* Submit */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
              >
                {loading ? "Processing..." : "Add Sale"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSale;
