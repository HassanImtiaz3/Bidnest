import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/HomePage/index";
import Registration from "./pages/SignUpPage/index.jsx";
import Login from "./pages/LoginPage/index.jsx";
import User from "./pages/UserSignUpPage/index.jsx";
import UserLogin from "./pages/UserLoginPage/index.jsx";
import BidSearch from "./pages/BidSearch/index.jsx";
import Participating from "./pages/ParticipantPage/index.jsx";
import ContactUs from "./pages/ContactUsPage/index.jsx";
import WhyBidnest from "./pages/WhyBidnestPage/Why.jsx";
import AboutUs from "./pages/AboutUsPage/index.jsx";
import PostNow from "./pages/PostNowPage/index.jsx";
import Post from "./components/Post/Post";
import ProtectedRoute from "./services/ProtectedRoute.js";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard.jsx";
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import VendorStatusDashboard from "./components/VendorStatusDashboard/VendorStatusDashboard.jsx";
import { VendorRoute, UserRoute } from "./services/ProtectedRoute.js";
import ScrollToTop from "./utils/scrollTop.jsx";
import Admin from "./pages/AdminDashboard/Admin.jsx";
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard.jsx";
import { AdminVendorDashboard } from "./pages/AdminDashboard/Vendor.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Header />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user" element={<User />} />
        <Route path="/bid-search" element={<BidSearch />} />
        <Route path="/participanting-agencies" element={<Participating />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/why-bidnest" element={<WhyBidnest />} />
        <Route path="/post" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vendor" element={<AdminVendorDashboard />} />

        {/* Vendor-only routes */}
        <Route element={<VendorRoute />}>
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route
            path="/vendor-status-dashboard"
            element={<VendorStatusDashboard />}
          />
        </Route>

        {/* User-only routes */}
        <Route element={<UserRoute />}>
          <Route path="/post-now" element={<PostNow />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
