import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Social Media Analytics Dashboard</h1>
          <p>Transform your social media presence with powerful insights and analytics</p>
          <Link to="/dashboard">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Analytics</h3>
            <p>Track your social media performance in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Growth Insights</h3>
            <p>Understand your audience and engagement trends</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Reports</h3>
            <p>Generate comprehensive reports with one click</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to boost your social media strategy?</h2>
        <p>Join thousands of social media managers who trust our platform</p>
        <button className="cta-button">Start Free Trial</button>
      </div>
    </div>
  );
};

export default Home;
