import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading.jsx";
import StockProvider from "./stockContext/StockContext.jsx";
// -------------------- Public Pages --------------------
const Login = lazy(() => import("./pages/publicPages/LogIn.jsx"));
const Register = lazy(() => import("./pages/publicPages/SignUp.jsx"));
const ForgotPassword = lazy(() => import("./pages/publicPages/ForgotPassword.jsx"));
const VerifyEmailOTP = lazy(() => import("./pages/publicPages/VerifyEmailOTP.jsx"));
const VerifyPasswordOTP = lazy(() => import("./pages/publicPages/VerifyPasswordOTP.jsx"));
const PasswordReset = lazy(() => import("./pages/publicPages/PasswordReset.jsx"));

// -------------------- Protected Wrapper --------------------
const Authenticate = lazy(() => import("./components/Authenticate.jsx"));

// -------------------- Dashboard Layout --------------------
const DashBoard = lazy(() => import("./pages/protectedPages/DashBoard.jsx"));

// -------------------- Dashboard Subpages --------------------
// Items
const ItemsList = lazy(() => import("./pages/protectedPages/dashBoard/item/ItemsList.jsx"));
const AddItem = lazy(() => import("./pages/protectedPages/dashBoard/item/AddItem.jsx"));

// Categories
const CategoriesList = lazy(() => import("./pages/protectedPages/dashBoard/category/CategoriesList.jsx"));
const AddCategory = lazy(() => import("./pages/protectedPages/dashBoard/category/AddCategory.jsx"));
const EditCategory = lazy(() => import("./pages/protectedPages/dashBoard/category/EditCategory.jsx"));

// Sales
const SalesList = lazy(() => import("./pages/protectedPages/dashBoard/sale/SalesList.jsx"));
const AddSale = lazy(() => import("./pages/protectedPages/dashBoard/sale/AddSale.jsx"));
const EditSale = lazy(() => import("./pages/protectedPages/dashBoard/sale/EditSale.jsx"));
const Sale = lazy(() => import("./pages/protectedPages/dashBoard/sale/Sale.jsx"));

// Reports
const Reports = lazy(() => import("./pages/protectedPages/dashBoard/report/Reports.jsx"));
const SalesOverview = lazy(() => import("./pages/protectedPages/dashBoard/report/SalesOverview.jsx"));
const SalesByItem = lazy(() => import("./pages/protectedPages/dashBoard/report/SalesByItem.jsx"));
const SalesByCategory = lazy(() => import("./pages/protectedPages/dashBoard/report/SalesByCategory.jsx"));
const TopItems = lazy(() => import("./pages/protectedPages/dashBoard/report/TopItems.jsx"));
const LowStock = lazy(() => import("./pages/protectedPages/dashBoard/report/LowStock.jsx"));
const SalesByDate = lazy(()=> import("./pages/protectedPages/dashBoard/report/SalesByDate.jsx"));
const RevenueAnalytics = lazy(() => import("./pages/protectedPages/dashBoard/report/RevenueAnalytics.jsx"));
// Account 
const Account = lazy(()=> import("./pages/protectedPages/dashBoard/account/Account.jsx"))
const AdminManagement = lazy(()=> import("./pages/protectedPages/dashBoard/account/AdminManagement.jsx"))
const Profile = lazy(()=>import("./pages/protectedPages/dashBoard/account/Profile.jsx"))
const Security = lazy(()=> import("./pages/protectedPages/dashBoard/account/Security.jsx"))
function App() {
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* -------------------- Public Routes -------------------- */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email-otp" element={<VerifyEmailOTP />} />
          <Route path="/verify-password-otp" element={<VerifyPasswordOTP />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* -------------------- Protected Routes -------------------- */}
          <Route
            path="/dashboard/*"
            element={
              <Authenticate>
                <StockProvider>
                      <DashBoard />
                </StockProvider>
              </Authenticate>
            }
          >
            {/* Default dashboard page */}
            <Route index element={<ItemsList />} />

            {/* ---------------- Items ---------------- */}
            <Route path="items" element={<ItemsList />} />
            <Route path="items/add" element={<AddItem />} />

            {/* ---------------- Categories ---------------- */}
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />

            {/* ---------------- Sales ---------------- */}
            <Route path="sales/*" element={<Sale />}>
              <Route index element={<SalesList />} />        {/* /dashboard/sales */}
              <Route path="add" element={<AddSale />} />     {/* /dashboard/sales/add */}
              <Route path="list" element={<SalesList />} />  {/* optional */}
              <Route path="edit/:id" element={<EditSale />} />
            </Route>

            {/* ---------------- Reports ---------------- */}
            <Route path="reports" element={<Reports />}>
              {/* Default route for /dashboard/reports */}
              <Route index element={<SalesOverview />} />

              {/* Nested report routes */}
              <Route path="sales-overview" element={<SalesOverview />} />
              <Route path="sales-by-item" element={<SalesByItem />} />
              <Route path="sales-by-category" element={<SalesByCategory />} />
              <Route path="top-items" element={<TopItems />} />
              <Route path="low-stock" element={<LowStock />} />
              <Route path="revenue-analytics" element={<RevenueAnalytics />} />
              <Route path="sales-by-date" element={<SalesByDate />}/>
              
            </Route>
            {/*Account Pages*/}
            <Route path="account" element={<Account />}>
        {/* Default /account shows Profile */}
        <Route index element={<Profile />} />

        {/* Specific pages */}
        <Route path="security" element={<Security />} />
        <Route path="admin-management" element={<AdminManagement />} />
      </Route>
          </Route>
        </Routes>
      </Suspense>

      <Toaster />
    </>
  );
}
export default App;
