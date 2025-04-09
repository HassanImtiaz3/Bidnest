import React from 'react';
import bannerImage from "../../assets/banner.jpg";

const Post = () => {
  const primaryColor = '#673de6';
  const textSecondaryColor = '#ffffff';
  const hoverColor = '#9896F0';

  const posts = [
    {
      title: 'Brand New iPhone 13 - 128GB',
      price: 'PKR 180,000',
      location: 'Lahore, Pakistan',
      description: 'Brand new iPhone 13, 128GB, in excellent condition. Used for a month only.',
      imageUrl: {bannerImage},
    },
    {
      title: 'Samsung Galaxy S21 - 256GB',
      price: 'PKR 150,000',
      location: 'Karachi, Pakistan',
      description: 'Used for a week. Comes with original box and charger.',
      imageUrl: 'https://propakistani.pk/price/wp-content/uploads/2021/11/Apple-iPhone-13-price-in-Pakistan-200x300.png',
    },
    {
      title: 'MacBook Pro 16" - 512GB SSD',
      price: 'PKR 250,000',
      location: 'Islamabad, Pakistan',
      description: 'Retina display, 512GB SSD. Mint condition.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+3',
    },
    {
      title: 'PlayStation 5 - Console',
      price: 'PKR 120,000',
      location: 'Rawalpindi, Pakistan',
      description: 'PS5 console with one controller. Perfect condition.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+4',
    },
    {
      title: 'Canon EOS 5D Mark IV',
      price: 'PKR 220,000',
      location: 'Lahore, Pakistan',
      description: 'DSLR with 24-105mm lens. Excellent condition.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+5',
    },
    {
      title: 'Dell XPS 13 - 512GB SSD',
      price: 'PKR 180,000',
      location: 'Karachi, Pakistan',
      description: 'XPS 13, 512GB SSD, 16GB RAM. Excellent condition.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+6',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', background: 'linear-gradient(135deg, #f0f0f0, #e1e1e1)' }}>
      {/* Responsive Grid Styles */}
      <style>{`
  .post-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    justify-items: center;
  }

  .post-card {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    padding: 25px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 600px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
  }

  .post-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .post-image {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .post-title {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
  }

  .post-price {
    font-size: 1.4em;
    color: ${primaryColor};
    margin-bottom: 10px;
  }

  .post-location {
    font-style: italic;
    color: #777;
    margin-bottom: 15px;
  }

  .post-description {
    color: #555;
    line-height: 1.6;
    font-size: 1.1em;
    margin-bottom: 25px;
  }

  .contact-btn {
    background-color: ${primaryColor};
    color: ${textSecondaryColor};
    padding: 14px;
    border: none;
    border-radius: 25px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 100%;
  }

  .contact-btn:hover {
    background-color: ${hoverColor};
    transform: scale(1.05);
  }
`}</style>


      <h1 style={{ color: primaryColor, marginBottom: '30px', fontSize: '2.5em', textAlign: 'center', fontFamily: 'Roboto', fontWeight: 'bold' }}>
        Your Posts
      </h1>

      <div className="post-grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <h2 className="post-title">{post.title}</h2>
            <p className="post-price">{post.price}</p>
            <p className="post-location">{post.location}</p>
            <p className="post-description">{post.description}</p>
            <button className="contact-btn">Contact Customer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
