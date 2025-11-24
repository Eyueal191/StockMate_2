import React, { useState } from "react";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";
import { User, Mail, Phone, ShieldCheck, ShieldX, Crown } from "lucide-react";

function AdminManagementCard({ user, refreshList }) {
  const [loading, setLoading] = useState(false);

  const handleGrantAdmin = async () => {
    setLoading(true);
    try {
      const res = await Axios.put(`/api/user/grant-admin/${user._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        refreshList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error granting admin role");
    } finally {
      setLoading(false);
    }
  };

  const handleDenyAdmin = async () => {
    setLoading(true);
    try {
      const res = await Axios.put(`/api/user/deny-admin/${user._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        refreshList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error denying admin role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        p-4 sm:p-5 md:p-6 rounded-xl bg-white flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between
        border border-gray-300 shadow-sm 
        hover:shadow-md transition
      "
    >
      {/* LEFT: USER DETAILS */}
      <div className="flex-1 space-y-1 w-full md:w-1/3">
        <h1 className="font-semibold text-lg text-gray-800 flex items-center gap-2 flex-wrap">
          <User size={18} className="text-gray-700" />
          {user?.name}
        </h1>

        <p className="text-gray-600 flex items-center gap-2 flex-wrap">
          <Mail size={16} className="text-blue-600" />
          {user?.email}
        </p>

        <p className="text-gray-600 flex items-center gap-2 flex-wrap">
          <Phone size={16} className="text-green-600" />
          {user?.phone || "Not provided"}
        </p>
      </div>

      {/* MIDDLE: ROLE + STATUS */}
      <div className="w-full md:w-1/3 px-0 sm:px-2 md:px-4 mt-3 md:mt-0 text-gray-700 space-y-1 text-left md:text-right">
        <p className="font-medium flex items-center gap-2 justify-start md:justify-end flex-wrap">
          <Crown size={18} className="text-amber-500" />
          Role: {user?.role}
        </p>

        <p className="font-medium flex items-center gap-2 justify-start md:justify-end flex-wrap">
          {user?.adminRoleGranted ? (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm flex items-center gap-1">
              <ShieldCheck size={16} />
              Admin Granted
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-1">
              <ShieldX size={16} />
              Staff Only
            </span>
          )}
        </p>
      </div>

      {/* RIGHT: ACTION BUTTONS */}
      {user?.role !== "Admin" && (
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 mt-3 md:mt-0 md:ml-4 w-full md:w-auto">
          {/* Grant Button */}
          <button
            onClick={handleGrantAdmin}
            disabled={loading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow transition
              ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}
            `}
          >
            <ShieldCheck size={18} />
            {loading ? "Processing..." : "Grant Admin"}
          </button>

          {/* Deny Button */}
          <button
            onClick={handleDenyAdmin}
            disabled={loading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow transition
              ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}
            `}
          >
            <ShieldX size={18} />
            {loading ? "Processing..." : "Deny Admin"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminManagementCard;
