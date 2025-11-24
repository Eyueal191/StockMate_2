const userApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    /** -------------------- AUTHENTICATION -------------------- **/
    signUp: { method: "POST", url: "/api/user/register" },
    logIn: { method: "POST", url: "/api/user/login" },
    logOut: { method: "GET", url: "/api/user/logout" },

    /** -------------------- EMAIL OTP -------------------- **/
    verifyEmailOtp: { method: "POST", url: "/api/user/verify-email-otp" },
    resendEmailOtp: { method: "POST", url: "/api/user/resend-email-otp" },

    /** -------------------- PASSWORD MANAGEMENT -------------------- **/
    forgotPasswordOtp: { method: "POST", url: "/api/user/forgot-password-otp" },
    verifyPasswordOtp: { method: "POST", url: "/api/user/verify-password-otp" },
    passwordReset: { method: "PUT", url: "/api/user/password-reset" },
    changePassword: { method: "PUT", url: "/api/user/change-password" },

    /** -------------------- USER MANAGEMENT -------------------- **/
    updateUser: { method: "PUT", url: "/api/user/update-user" },
    getCurrentUser: { method: "GET", url: "/api/user/me" },
    getUsersList: { method: "GET", url: "/api/user" },

    /** -------------------- ADMIN ROLE MANAGEMENT -------------------- **/
    grantAdminRole: (id) => ({ method: "PUT", url: `/api/user/grant-admin/${id}` }),
    denyAdminRole: (id) => ({ method: "PUT", url: `/api/user/deny-admin/${id}` }),
  },
};

export default userApiSummary;
