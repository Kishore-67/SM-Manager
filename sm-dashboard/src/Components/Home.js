import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import Hero from "./Landing Page Components/Hero";
import Features from "./Landing Page Components/Features";
import Pricing from "./Landing Page Components/Pricing";
import Footer from "./Landing Page Components/Footer";
import BrandNav from './BrandNav';
import Nav from './Nav';

const Home = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  const handleBrandClick = () => {
    setUserType('brand');
    navigate('/brandauth');
  };

  const handleInfluencerClick = () => {
    setUserType('influencer');
    navigate('/Dashboard');
  };

  return (
    <div className="home-container">
      {userType === 'brand' && <BrandNav />}
      {userType === 'influencer' && <Nav />}
      
      {/* Hero Split Section */}
      <section className="hero-split">
        <div className="split-container">
          <div className="split-section brand">
            <div className="overlay"></div>
            <div className="content">
              <div className="content-inner">
                <h1>For Brands</h1>
                <p>Elevate your social media presence with powerful analytics and management tools</p>
                <div className="features-list">
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Real-time Analytics</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>Campaign Management</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📈</span>
                    <span>Performance Tracking</span>
                  </div>
                </div>
                <button onClick={handleBrandClick} className="cta-button brand-button">
                  <span className="icon">🏢</span>
                  Enter as Brand
                </button>
              </div>
            </div>
          </div>
          
          <div className="split-section influencer">
            <div className="overlay"></div>
            <div className="content">
              <div className="content-inner">
                <h1>For Influencers</h1>
                <p>Grow your audience and monetize your content across all platforms</p>
                <div className="features-list">
                  <div className="feature-item">
                    <span className="feature-icon">🌟</span>
                    <span>Audience Insights</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💰</span>
                    <span>Monetization Tools</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📱</span>
                    <span>Content Management</span>
                  </div>
                </div>
                <button onClick={handleInfluencerClick} className="cta-button influencer-button">
                  <span className="icon">⭐</span>
                  Enter as Influencer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Original Content Sections */}
      <div className="original-content">
        <Hero />
        <Features />
        <Pricing />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;