import React, { useState } from "react";
import authBg from "../../assets/authBg.png";
import Axios from "../../axios/axios.config.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }

    try {
      setLoading(true);
      const res = await Axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("email", email)
        // Pass email as query param
        navigate(`/verify-email-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Registration failed");
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
      <div className="absolute w-full h-full bg-black/25 z-[-1]"></div>

      {/* Form Card */}
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-11/12 max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-3 pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow-md transition"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
