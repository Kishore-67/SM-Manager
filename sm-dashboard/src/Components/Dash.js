import React, { useState } from 'react';
import '../Styles/Dash.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activePlatform, setActivePlatform] = useState('All Platforms');

  const platforms = [
    { name: 'All Platforms', icon: '📊' },
    { name: 'Facebook', icon: '👥' },
    { name: 'Instagram', icon: '📸' },
    { name: 'YouTube', icon: '🎥' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'TikTok', icon: '🎵' },
  ];

  const trendingTags = [
    { tag: '#Marketing', count: '125K' },
    { tag: '#SocialMedia', count: '98K' },
    { tag: '#Influencer', count: '76K' },
    { tag: '#Branding', count: '65K' },
    { tag: '#Advertising', count: '45K' },
  ];

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Sample data for the last 7 days
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Youtube',
        data: [1200, 1900, 3000, 5000, 4000, 3000, 6000],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Instagram',
        data: [500, 800, 1000, 3500, 3200, 4900, 5000],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Facebook',
        data: [200, 350, 500, 1800, 1600, 1450, 2000],
        borderColor: '#4267B2',
        backgroundColor: 'rgba(66, 103, 178, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Platforms</h3>
        </div>
        <div className="platform-list">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              className={`platform-button ${activePlatform === platform.name ? 'active' : ''}`}
              onClick={() => setActivePlatform(platform.name)}
            >
              <span className="platform-icon">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="content-wrapper">
            {/* Left Column - Stats Cards */}
            <div className="stats-column">
              <div className="top-cards">
                {/* Impressions Card */}
                <div className="stat-card impressions">
                  <div className="stat-icon">👁️</div>
                  <div className="stat-content">
                    <h3>Total Impressions</h3>
                    <div className="stat-numbers">
                      <div className="main-stat">2.4M</div>
                      <div className="stat-change positive">
                        <span className="arrow">↑</span>
                        12.5%
                      </div>
                    </div>
                    <p className="stat-period">vs last week</p>
                  </div>
                </div>

                {/* Trending Tags Card */}
                <div className="stat-card trending">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-content">
                    <h3>Trending Tags</h3>
                    <div className="trending-tags">
                      {trendingTags.map((tag, index) => (
                        <div key={index} className="tag">
                          <span className="tag-name">{tag.tag}</span>
                          <span className="tag-count">{tag.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart */}
            <div className="chart-column">
              <div className="chart-card">
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;