import React, { useState, useEffect } from "react";
import authBg from "../../assets/authBg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Prefill email from query params or localStorage
  const initialEmail = searchParams.get("email") || localStorage.getItem("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update email if query param changes
    const queryEmail = searchParams.get("email");
    if (queryEmail) setEmail(queryEmail);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const res = await Axios.post("/api/user/forgot-password-otp", { email });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/verify-password-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
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

      {/* Form Container */}
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-lg w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center">
          Enter your email to receive a One-Time Password (OTP)
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="border border-gray-300 rounded-lg px-3 py-2 sm:py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-100 text-sm sm:text-base md:text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white py-2 sm:py-3 md:py-3 rounded-lg hover:bg-blue-600 shadow-md transition-colors text-sm sm:text-base md:text-lg font-medium disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-xs sm:text-sm md:text-base">
          Remember your password?{" "}
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
