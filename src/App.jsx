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

function App() {
  return (
    <Router>
      <Routes>
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
        <Route
          path="/post-now"
          element={
            <ProtectedRoute>
              <PostNow />
            </ProtectedRoute>
          }
        />
        <Route path="/Post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
