import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Axios from "../../../../axios/axios.config.js";
import Loading from "../../../../components/Loading.jsx";
import { User, Mail, Phone, Edit2, Save, X, Info, ShieldCheck } from "lucide-react";

function Profile() {
  const [viewMode, setViewMode] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch user data
  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("/api/user/me");
      if (data.success && data.user) setUser(data.user);
      else throw new Error(data.message || "Failed to fetch user");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  // Update user data
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const form = new FormData(e.target);
      const userData = {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        bio: form.get("bio"),
      };

      const { data } = await Axios.put("/api/user/update-user", userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        toast.success("You've successfully Updated Your Profile updated successfully");
        setUser(data.user);
        setViewMode(true);
      } else throw new Error(data.message || "Failed to update profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => { getUser(); }, []);

  if (loading) return <Loading />;
  if (!user) return <p className="text-gray-500 text-center mt-4">No user data available</p>;

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex flex-row flex-wrap items-start gap-3 mb-4">
        <Info size={26} className="text-blue-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your personal information and keep your profile up-to-date.
          </p>
          <p className="text-gray-500 text-sm sm:text-base flex items-center gap-2 mt-1">
            <ShieldCheck size={16} className="text-green-500" />
            Ensure your details are accurate for security and notifications.
          </p>
        </div>
      </div>

      {/* VIEW MODE */}
      {viewMode ? (
        <div className="flex flex-col gap-6 border p-4 sm:p-6 rounded-2xl shadow-lg bg-white">

          {/* User Details */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <User size={18} /> {user.name}
            </span>
            <span className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <Mail size={16} /> {user.email}
            </span>
            <span className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <Phone size={16} /> {user.phone || "Phone not set"}
            </span>
          </div>

          {/* Bio */}
          <div className="pt-4 border-t">
            <h3 className="text-gray-700 font-semibold mb-1 text-sm sm:text-base">Bio</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {user.bio || "No bio available."}
            </p>
          </div>

          {/* EDIT BUTTON BELOW BIO */}
          <div className="mt-4">
            <button
              onClick={() => setViewMode(false)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition w-48 justify-start"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={updateUser}
          className="flex flex-col gap-4 sm:gap-6 border p-4 sm:p-6 rounded-2xl shadow-lg bg-white"
        >
          <div className="flex flex-col gap-4 flex-1">
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-medium">
                <User size={16} /> Name:
              </span>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-medium">
                <Mail size={16} /> Email:
              </span>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-medium">
                <Phone size={16} /> Phone:
              </span>
              <input
                type="text"
                name="phone"
                defaultValue={user.phone || ""}
                className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm sm:text-base text-gray-700 font-medium">Bio:</span>
              <textarea
                name="bio"
                defaultValue={user.bio || ""}
                className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300 resize-none h-24 text-sm sm:text-base"
              />
            </label>

            {/* ACTION BUTTONS BELOW BIO */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="submit"
                disabled={updating}
                className={`flex items-center gap-2 px-6 py-2 font-semibold rounded-lg transition w-48 justify-start ${
                  updating ? "bg-blue-300 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Save size={16} /> {updating ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setViewMode(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition w-48 justify-start"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
export default Profile;
