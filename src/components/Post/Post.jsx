import React, { useEffect, useState } from "react";
import bannerImage from "../../assets/banner.jpg";
import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getPost } from "../../services/Post";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const navigate = useNavigate();

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
        console.log("Full API Response:", result);

        if (result.success) {
          const postsData = result.data.posts;
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

  const toggleExpand = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  return (
    <>
      <Navbar />
      <div className="post-container">
        <h1 className="post-heading">Your Posts</h1>
        <div className="post-grid">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              const fullDescription = post.message || "No description available";
              const words = fullDescription.trim().split(" ");
              const isLong = words.length > 10;
              const isExpanded = expandedPosts[index];

              const displayedDescription =
                isLong && !isExpanded
                  ? words.slice(0, 10).join(" ") + "..."
                  : fullDescription;

              return (
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
                  <p className="post-description">{displayedDescription}</p>

                  {isLong && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}

                  {role === "vendor" && (
                    <button
                      className="contact-btn"
                      onClick={() => {
                        navigate("/vendor-dashboard", { state: { post } });
                      }}
                    >
                      Contact Customer
                    </button>
                  )}
                  {role === "user" && (
                    <button
                      className="contact-btn-status"
                      onClick={() => {
                        navigate("/user-dashboard");
                      }}
                    >
                      View Status
                    </button>
                  )}
                </div>
              );
            })
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
