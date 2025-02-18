import React from 'react';
import bannerImage from "../../assets/banner.jpg";

export default function App() {
  return (
    <header>
      <div
        id='intro-example'
        className='text-center bg-image mask'
        style={{
          background: `url(${bannerImage}) no-repeat center center / cover`, // Background properties
          maxHeight: '650px', // Set maximum height
          paddingBottom: '12%', // Padding for bottom spacing
          paddingTop: '12%', // Padding for top spacing
          backgroundColor : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <div>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white' align ="left">
              <h1 className='mb-3'>Find government bids <br/> matching your business.</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
