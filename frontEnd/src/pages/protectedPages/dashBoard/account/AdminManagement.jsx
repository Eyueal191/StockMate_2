import React, { useState, useEffect } from "react";
import Axios from "../../../../axios/axios.config.js";
import AdminManagementCard from "../../../../components/cards/AdminManagementCard";
import toast from "react-hot-toast";
import { ShieldCheck, Users, Crown } from "lucide-react";
import Loading from "../../../../components/Loading.jsx";

function AdminManagement() {
  const [staffs, setStaffs] = useState([]);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  // Filter admin vs staff properly
  const filterOutAdmin = (users) => {
    const adminUser = users.find((u) => u.role === "Admin");
    const staffList = users.filter((u) => u.role !== "Admin");

    setAdmin(adminUser || {});
    setStaffs(staffList);
  };

  const fetchList = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("/api/user");

      if (data.success && data.users) {
        filterOutAdmin(data.users);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <Loading />;

  if (!staffs.length)
    return (
      <p className="text-center mt-6 text-gray-600">No staff members found.</p>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">

      {/* ================= HEADER ================= */}
      <header className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 shadow-sm flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <Crown size={32} className="text-blue-600 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
            Admin Dashboard — StockMate Inventory System
          </h1>
        </div>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <ShieldCheck size={20} className="text-green-600 flex-shrink-0" />
          <span>
            Hello <span className="font-semibold">{admin?.name}</span>, you are the main administrator of the StockMate Inventory System. From here you can manage staff permissions, grant or revoke admin privileges, and maintain full control over your shop’s internal operations.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 text-sm mt-2">
          <Users size={18} />
          <span>Below is the list of all staff members under your management.</span>
        </div>
      </header>

      {/* ================= STAFF LIST ================= */}
      <main>
        <div className="flex flex-col gap-4">
          {staffs.map((staff) => (
            <AdminManagementCard
              user={staff}
              key={staff._id}
              refreshList={fetchList}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
export default AdminManagement;
