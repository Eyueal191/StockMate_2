import React, { useState, useEffect } from "react";
import authBg from "../../assets/authBg.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";

function VerifyPasswordOTP() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialEmail =
    searchParams.get("email") || localStorage.getItem("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) setEmail(queryEmail);
  }, [searchParams]);

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple requests
    if (!otp || !email) return toast.error("OTP and Email are required");

    try {
      setLoading(true);
      const res = await Axios.post("/api/user/verify-password-otp", { email, otp });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    if (loading) return; // Prevent multiple requests
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const res = await Axios.post("/api/user/forgot-password-otp", { email });

      if (res.data.success) {
        toast.success("OTP sent again!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <img
        src={authBg}
        alt="Background"
        className="absolute w-full h-full object-cover z-[-2]"
      />
      <div className="absolute w-full h-full bg-black/25 z-[-1]"></div>

      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-800">
          Verify Password
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center">
          Enter the OTP sent to your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
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

          {/* OTP */}
          <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading}
            className="border border-gray-300 rounded-lg px-3 py-2 sm:py-3 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-100 text-sm sm:text-base md:text-lg"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 shadow-md transition-colors text-sm sm:text-base md:text-lg font-medium disabled:bg-blue-300"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 sm:py-3 rounded-lg hover:bg-gray-300 shadow-md transition-colors text-sm sm:text-base md:text-lg font-medium disabled:bg-gray-300"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyPasswordOTP;
