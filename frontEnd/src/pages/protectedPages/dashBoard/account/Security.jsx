import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../../../../axios/axios.config.js";
import {
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match!");
    }

    try {
      setLoading(true);
      const { data } = await Axios.put(
        "/api/user/change-password",
        { currentPassword, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success(data.message || "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
      
      {/* HEADER */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Lock size={26} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Account Security Settings
          </h2>
        </div>
        <p className="text-gray-500">
          Keep your account safe by updating your password regularly.
        </p>
        <p className="text-gray-500 flex items-center gap-2">
          <ShieldAlert size={16} className="text-red-500" />
          Make sure to choose a strong and unique password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Current Password */}
        <div className="relative">
          <label className="text-sm text-gray-700 font-medium flex items-center gap-1">
            <KeyRound size={16} /> Current Password:
          </label>
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-300"
          />
          <div
            className="absolute top-11.5 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="text-sm text-gray-700 font-medium flex items-center gap-1">
            <ShieldCheck size={16} /> New Password:
          </label>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-300"
          />
          <div
            className="absolute top-11.5 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="text-sm text-gray-700 font-medium flex items-center gap-1">
            <ShieldCheck size={16} /> Confirm Password:
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-300"
          />
          <div
            className="absolute top-11.5 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 mt-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Changing..." : <><Lock size={18} /> Change Password</>}
        </button>
      </form>
    </div>
  );
}

export default Security;
