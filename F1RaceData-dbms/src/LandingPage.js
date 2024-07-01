// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      {/* Video Section */}
      <video  muted autoPlay loop width="600" height="400" className="landing-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Button to navigate to the existing App component */}
      <Link to="/app">
        <div className='appButton'>
          <button className='choma'>
            <span>FORMULA 1</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
