import React, { useState, useEffect } from "react";
import authBg from "../../assets/authBg.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Password visibility toggles
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract email from query params
  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
    } else {
      navigate("/verify-password-otp");
    }
  }, [searchParams, navigate]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await Axios.put("/api/user/password-reset", {
        email,
        password: newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background */}
      <img
        src={authBg}
        alt="Background"
        className="absolute w-full h-full object-cover z-[-2]"
      />
      <div className="absolute w-full h-full bg-black/30 z-[-1]"></div>

      {/* Form container */}
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-lg w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-800">
          Reset Password
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center">
          Set your new password
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password */}
          <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base md:text-lg disabled:bg-gray-100 pr-10"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base md:text-lg disabled:bg-gray-100 pr-10"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white py-2 sm:py-3 md:py-3 rounded-lg hover:bg-blue-600 shadow-md transition-colors text-sm sm:text-base md:text-lg font-medium disabled:bg-blue-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-xs sm:text-sm md:text-base">
          Remembered your password?{" "}
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
export default PasswordReset;
