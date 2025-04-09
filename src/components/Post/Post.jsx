import React from 'react';

import bannerImage from '../../assets/banner.jpg';
import './index.css';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Post = () => {
  const posts = [
    {
      name: 'Product Name',
      unitPrice: 'Single Piece PKR 18,000',
      totalQuantity: 10,
      totalPrice: 'Total Price: PKR 180,000',
      category: 'Category Name',
      description: 'Short Description: This product is top quality and available in stock.',
      imageUrl: bannerImage,
    },
    {
      name: 'Product Name',
      unitPrice: 'Single Piece PKR 15,000',
      totalQuantity: 5,
      totalPrice: 'Total Price: PKR 75,000',
      category: 'Category Name',
      description: 'Short Description: Limited edition, fast selling item.',
      imageUrl: 'https://propakistani.pk/price/wp-content/uploads/2021/11/Apple-iPhone-13-price-in-Pakistan-200x300.png',
    },
    {
      name: 'Product Name',
      unitPrice: 'Single Piece PKR 12,000',
      totalQuantity: 3,
      totalPrice: 'Total Price: PKR 36,000',
      category: 'Category Name',
      description: 'Short Description: Excellent value and condition.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+3',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="post-container">
        <h1 className="post-heading">Your Posts</h1>

        <div className="post-grid">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <img src={post.imageUrl} alt={post.name} className="post-image" />
              <h2 className="post-title">{post.name}</h2>
              <p className="post-price">{post.unitPrice}</p>
              <p className="post-location">Total Quantity: {post.totalQuantity}</p>
              <p className="post-price">{post.totalPrice}</p>
              <p className="post-location">{post.category}</p>
              <p className="post-description">{post.description}</p>
              <button className="contact-btn">Contact Customer</button>
              <button className="contact-btn-status">View Status</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Post;
