import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
import Loading from "../../../../components/Loading.jsx";

// Confirm Modal Component
const ConfirmModal = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-80 sm:w-96 text-gray-100 shadow-lg">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold">
            Confirm
          </button>
          <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function EditSale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchSaleList } = useContext(StockContext);

  const [sale, setSale] = useState(null);
  const [data, setData] = useState({ name: "", quantity: "", seller: "", date: "" });
  const [loading, setLoading] = useState(false); // fetch/update/delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch sale by ID
  const getSaleById = async () => {
    try {
      setLoading(true);
      const res = await Axios.get(`/api/sale/${id}`);
      if (res.data.success) {
        setSale(res.data.sale);
        setData({
          name: res.data.sale.item?.name || "",
          quantity: res.data.sale.quantity || "",
          seller: res.data.sale.seller || "",
          date: res.data.sale.date ? new Date(res.data.sale.date).toISOString().split("T")[0] : "",
        });
      } else {
        toast.error(res.data.message || "Failed to fetch sale.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error fetching sale.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) getSaleById(); }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Update sale
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const payload = { itemName: data.name, quantity: data.quantity, seller: data.seller, date: data.date };
      const res = await Axios.put(`/api/sale/${id}`, payload);
      if (res.data.success) {
        toast.success("Sale updated successfully!");
        await refetchSaleList();
     setTimeout(() => navigate("/dashboard/sales"), 2000);
;
      } else {
        toast.error(res.data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update error.");
    } finally {
      setLoading(false);
    }
  };

  // Delete sale
  const handleDelete = async () => {
    setShowDeleteModal(false);
    if (loading) return;

    try {
      setLoading(true);
      const res = await Axios.delete(`/api/sale/${id}`);
      if (res.data.success) {
        toast.success("Sale deleted successfully!");
          await refetchSaleList()
        setTimeout(()=>
        navigate("/dashboard/sales"),1000)
      } else {
        toast.error(res.data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !sale) return <Loading />;

  return (
    <div className="w-full h-auto py-12 bg-gray-50">
      <div className="p-6 bg-gray-800 shadow-2xl border border-gray-400 rounded-2xl max-w-xl mx-auto my-12 relative">
        {loading && <Loading message="Processing..." overlay />}
        <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
          <span className="text-[1.5rem] sm:text-[2rem] font-extrabold text-gray-100">Edit Sale</span>
          <span className="w-20 sm:w-30 h-1 mt-2 sm:mt-4 bg-gray-600 rounded-full"></span>
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          {["name", "quantity", "seller", "date"].map(field => (
            <div className="flex flex-col" key={field}>
              <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
                {field === "name" ? "Item Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "quantity" ? "number" : field === "date" ? "date" : "text"}
                name={field}
                value={data[field]}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                required={field !== "seller"}
                min={field === "quantity" ? "0" : undefined}
                disabled={loading}
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Sale"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-400"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Sale"}
            </button>
          </div>
        </form>

        <ConfirmModal
          open={showDeleteModal}
          message="Are you sure you want to delete this sale record?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}

export default EditSale;
