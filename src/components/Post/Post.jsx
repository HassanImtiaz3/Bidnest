import React, { useEffect, useState } from "react";
import bannerImage from "../../assets/banner.jpg";
import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getPost } from "../../services/Post";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = localStorage.getItem("user");
  let role = "";
  try {
    role = userData ? JSON.parse(userData)?.role : "";
  } catch (e) {
    console.error("Error parsing user data:", e);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPost();
        console.log("Full API Response:", result); // For debugging

        if (result.success) {
          // Access the nested posts data
          const postsData = result.data.posts;

          // Convert to array if it's a single object
          const postsArray = postsData
            ? Array.isArray(postsData)
              ? postsData
              : [postsData]
            : [];

          setPosts(postsArray);
        } else {
          setError(result.error || "Failed to fetch posts");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="post-container">
          <h1 className="post-heading">Your Posts</h1>
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="post-container">
          <h1 className="post-heading">Your Posts</h1>
          <p className="error-message">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render posts
  return (
    <>
      <Navbar />
      <div className="post-container">
        <h1 className="post-heading">Your Posts</h1>

        <div className="post-grid">
          {/* Safe mapping - posts is guaranteed to be an array */}
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="post-card">
                <img
                  src={
                    post.file
                      ? `data:${post.fileType};base64,${post.file}`
                      : bannerImage
                  }
                  alt={post.fileName || "Post image"}
                  className="post-image"
                />
                <h2 className="post-title">
                  {post.productName || "Untitled Post"}
                </h2>
                <p className="post-price">
                  {post.budget || "Price not available"}
                </p>
                <p className="post-location">
                  Total Quantity: {post.quantity || "N/A"}
                </p>
                <p className="post-category">
                  {post.category || "Uncategorized"}
                </p>
                <p className="post-description">
                  {post.message || "No description available"}
                </p>
                {role !== "user" && (
                  <>
                    <button className="contact-btn">Contact Customer</button>
                    <button className="contact-btn-status">View Status</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Post;
