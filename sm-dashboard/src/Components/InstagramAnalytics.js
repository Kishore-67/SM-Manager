import React, { useEffect, useState } from 'react';
import '../Styles/InstagramAnalytics.css';
import { fetchInstagramData } from '../services/instagramService';
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

const InstagramAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadInstagramData();
  }, []);

  const loadInstagramData = async () => {
    try {
      setLoading(true);
      const instagramData = await fetchInstagramData();
      setData(instagramData);
      setError(null);
    } catch (err) {
      setError('Failed to load Instagram data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const prepareFollowerChartData = () => {
    if (!data || !data.followersHistory) return null;

    const labels = data.followersHistory.map(entry => 
      new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })
    );
    const followerData = data.followersHistory.map(entry => entry.count);

    return {
      labels,
      datasets: [
        {
          label: 'Followers',
          data: followerData,
          borderColor: '#E1306C',
          backgroundColor: 'rgba(225, 48, 108, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="instagram-analytics loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="instagram-analytics error">
        <p>{error}</p>
        <button onClick={loadInstagramData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const followerChartData = prepareFollowerChartData();

  return (
    <div className="instagram-analytics">
      <div className="instagram-header">
        <h2>Instagram Analytics</h2>
        <div className="instagram-overview">
          <div className="overview-card">
            <h3>Total Posts</h3>
            <p>{data.profile.mediaCount}</p>
          </div>
          <div className="overview-card">
            <h3>Total Likes</h3>
            <p>{data.insights.totalLikes}</p>
          </div>
          <div className="overview-card">
            <h3>Engagement Rate</h3>
            <p>{data.insights.engagementRate}</p>
          </div>
        </div>
      </div>
      
      {followerChartData && (
        <div className="followers-chart">
          <h3>Followers Trend</h3>
          <div className="chart-container">
            <Line options={chartOptions} data={followerChartData} />
          </div>
        </div>
      )}
      
      <div className="instagram-grid">
        <div className="recent-posts">
          <h3>Recent Posts Performance</h3>
          <div className="posts-list">
            {data.recentPosts.map((post, index) => (
              <div key={index} className="post-card">
                <div className="post-info">
                  <div className="post-type">{post.type}</div>
                  <div className="post-caption">{post.caption?.slice(0, 50)}{post.caption?.length > 50 ? '...' : ''}</div>
                  <div className="post-date">{post.timestamp}</div>
                </div>
                <div className="post-stats">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    View Post
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="profile-info">
          <h3>Account Information</h3>
          <div className="profile-details">
            <p><strong>Username:</strong> {data.profile.username}</p>
            <p><strong>Total Posts:</strong> {data.profile.mediaCount}</p>
            <p><strong>Total Comments:</strong> {data.insights.totalComments}</p>
            <div className="engagement-info">
              <h4>Engagement Summary</h4>
              <p>Average engagement rate of {data.insights.engagementRate} across your recent posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramAnalytics;
