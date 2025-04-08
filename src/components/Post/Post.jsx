import React, { useEffect, useState } from 'react';

const Post = () => {
  const primaryColor = '#673de6';
  const secondaryColor = '#00c9a7';
  const backgroundColor = '#f9f9f9';
  const textPrimaryColor = '#000000';
  const textSecondaryColor = '#ffffff';
  const hoverColor = '#9896F0';

  // Responsive column control
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) setColumns(1);
      else if (window.innerWidth <= 900) setColumns(2);
      else setColumns(3);
    };

    handleResize(); // on mount
    window.addEventListener('resize', handleResize); // on resize
    return () => window.removeEventListener('resize', handleResize); // cleanup
  }, []);

  const posts = [
    {
      title: 'Brand New iPhone 13 - 128GB',
      price: 'PKR 180,000',
      location: 'Lahore, Pakistan',
      description:
        'Brand new iPhone 13, 128GB, in excellent condition. Used for a month only.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+1',
    },
    {
      title: 'Samsung Galaxy S21 - 256GB',
      price: 'PKR 150,000',
      location: 'Karachi, Pakistan',
      description: 'Used for a week. Comes with original box and charger.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Product+2',
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
    <div
      style={{
        padding: '20px',
        backgroundColor: backgroundColor,
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          color: primaryColor,
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2em',
          fontWeight: 'bold',
        }}
      >
        Your Posts
      </h1>

      {/* Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '40px',
        }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={post.imageUrl}
                alt={post.title}
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <h2 style={{ fontSize: '1.4em', fontWeight: 'bold', color: textPrimaryColor }}>
              {post.title}
            </h2>
            <p style={{ fontSize: '1.2em', color: primaryColor }}>{post.price}</p>
            <p style={{ color: '#777', fontStyle: 'italic', fontSize: '1em' }}>{post.location}</p>
            <p style={{ fontSize: '1em', color: '#555', lineHeight: '1.6' }}>{post.description}</p>

            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  backgroundColor: primaryColor,
                  color: textSecondaryColor,
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = primaryColor)}
              >
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: primaryColor,
          textAlign: 'center',
          padding: '20px',
          fontSize: '1em',
          marginTop: '40px',
        }}
      >
        © 2025 Copyright:{' '}
        <a
          href="https://hoomanproduction.com"
          style={{
            color: primaryColor,
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.color = hoverColor)}
          onMouseLeave={(e) => (e.target.style.color = primaryColor)}
        >
          HoomanProduction.com
        </a>
      </div>
    </div>
  );
};

export default Post;
