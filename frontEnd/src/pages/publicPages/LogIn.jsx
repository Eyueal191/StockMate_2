import React, { useState } from "react";
import authBg from "../../assets/authBg.png";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post("/api/user/login", { email, password });
      const data = res.data;

      if (data.success) {
        toast.success(data.message);

        // Store login status
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("userId", data.user._id)
        // Store admin flag if user is admin
        if (data.user.role === "Admin") {
          localStorage.setItem("Admin", "true");
        } else {
          localStorage.removeItem("Admin");
        }

        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center font-sans">

      {/* Background */}
      <img
        src={authBg}
        alt="Background"
        className="absolute w-full h-full object-cover z-[-2]"
      />
      <div className="absolute w-full h-full bg-black/40 backdrop-blur-sm z-[-1]" />

      {/* Form */}
      <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
        
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
          Log In
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center">
          Enter your credentials to access your account
        </p>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">

          {/* Email */}
          <label className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 sm:py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm text-sm sm:text-base md:text-lg"
          />

          {/* Password */}
          <label className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mt-2">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 sm:py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm text-sm sm:text-base md:text-lg"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-lg font-semibold text-base sm:text-lg md:text-xl transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Forgot Password */}
          <p
            className="mt-2 text-center text-blue-600 hover:underline cursor-pointer text-sm sm:text-base md:text-lg"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </form>

        {/* Sign Up */}
        <p className="mt-6 text-center text-gray-500 text-sm sm:text-base md:text-lg">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:underline font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default LogIn;
