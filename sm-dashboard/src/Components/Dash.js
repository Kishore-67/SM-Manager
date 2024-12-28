import React, { useState } from 'react';
import '../Styles/Dash.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaYoutube, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activePlatform, setActivePlatform] = useState('All');
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "John Doe",
      userId: "@johndoe",
      description: "Digital content creator specializing in tech reviews",
      status: "Pending",
      showButtons: true
    },
    {
      id: 2,
      name: "Sarah Smith",
      userId: "@sarahsmith",
      description: "Lifestyle and fashion influencer",
      status: "Pending",
      showButtons: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      userId: "@mikej",
      description: "Travel vlogger and photographer",
      status: "Pending",
      showButtons: true
    },
    {
      id: 4,
      name: "Emily Brown",
      userId: "@emilybrown",
      description: "Food and cooking content creator",
      status: "Pending",
      showButtons: true
    },
    {
      id: 5,
      name: "Alex Wilson",
      userId: "@alexw",
      description: "Gaming and entertainment streamer",
      status: "Pending",
      showButtons: true
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTableData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: newStatus, showButtons: false } : item
      )
    );
  };

  // Dummy data for each platform
  const platformData = {
    youtube: {
      subscribers: 125000,
      views: 2500000,
      engagement: 8.5,
      recentVideos: 25,
      monthlyGrowth: 12.5,
      viewsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Views',
          data: [300000, 450000, 420000, 550000, 480000, 600000],
          borderColor: '#FF0000',
          tension: 0.4
        }]
      }
    },
    instagram: {
      followers: 85000,
      posts: 520,
      engagement: 4.2,
      reachRate: 25,
      impressions: 150000,
      followersData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Followers',
          data: [65000, 68000, 72000, 75000, 80000, 85000],
          borderColor: '#E1306C',
          tension: 0.4
        }]
      }
    },
    facebook: {
      likes: 95000,
      reach: 180000,
      engagement: 3.8,
      posts: 320,
      shares: 12500,
      engagementData: {
        labels: ['Likes', 'Comments', 'Shares'],
        datasets: [{
          data: [65, 20, 15],
          backgroundColor: ['#4267B2', '#5890FF', '#7EACFF'],
        }]
      }
    },
    twitter: {
      followers: 45000,
      tweets: 1200,
      engagement: 2.9,
      impressions: 95000,
      retweets: 8500,
      followersData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Followers Growth',
          data: [35000, 37000, 39000, 41000, 43000, 45000],
          backgroundColor: '#1DA1F2',
        }]
      }
    }
  };

  const PlatformCard = ({ platform, icon, color, stats }) => (
    <div className="platform-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="platform-header">
        {icon}
        <h3>{platform}</h3>
      </div>
      <div className="platform-stats">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-item">
            <span className="stat-label">{key}</span>
            <span className="stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</span>
          </div>
        ))}
      </div>
      <div className="platform-chart">
        {platform === 'Facebook' ? (
          <Doughnut data={platformData.facebook.engagementData} options={{ plugins: { legend: { display: false } } }} />
        ) : (
          <Line 
            data={platform === 'YouTube' ? platformData.youtube.viewsData :
                  platform === 'Instagram' ? platformData.instagram.followersData :
                  platformData.twitter.followersData}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3>Social Media Analytics</h3>
        <div className="platform-filters">
          {['All', 'YouTube', 'Instagram', 'Facebook', 'Twitter'].map(platform => (
            <button
              key={platform}
              className={`filter-btn ${activePlatform === platform ? 'active' : ''}`}
              onClick={() => setActivePlatform(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
      
      <div className="platforms-grid">
        {(activePlatform === 'All' || activePlatform === 'YouTube') && (
          <PlatformCard
            platform="YouTube"
            icon={<FaYoutube />}
            color="#FF0000"
            stats={{
              Subscribers: platformData.youtube.subscribers,
              Views: platformData.youtube.views,
              'Engagement Rate': `${platformData.youtube.engagement}%`,
              'Monthly Growth': `${platformData.youtube.monthlyGrowth}%`
            }}
          />
        )}
        
        {(activePlatform === 'All' || activePlatform === 'Instagram') && (
          <PlatformCard
            platform="Instagram"
            icon={<FaInstagram />}
            color="#E1306C"
            stats={{
              Followers: platformData.instagram.followers,
              Posts: platformData.instagram.posts,
              'Engagement Rate': `${platformData.instagram.engagement}%`,
              'Reach Rate': `${platformData.instagram.reachRate}%`
            }}
          />
        )}
        
        {(activePlatform === 'All' || activePlatform === 'Facebook') && (
          <PlatformCard
            platform="Facebook"
            icon={<FaFacebookF />}
            color="#4267B2"
            stats={{
              Likes: platformData.facebook.likes,
              Reach: platformData.facebook.reach,
              'Engagement Rate': `${platformData.facebook.engagement}%`,
              Shares: platformData.facebook.shares
            }}
          />
        )}
        
        {(activePlatform === 'All' || activePlatform === 'Twitter') && (
          <PlatformCard
            platform="Twitter"
            icon={<FaTwitter />}
            color="#1DA1F2"
            stats={{
              Followers: platformData.twitter.followers,
              Tweets: platformData.twitter.tweets,
              'Engagement Rate': `${platformData.twitter.engagement}%`,
              Retweets: platformData.twitter.retweets
            }}
          />
        )}
      </div>

      <div className="table-card">
        <h3>Content Creators</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>User ID</th>
                <th>Short Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.userId}</td>
                  <td>{item.description}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    {item.showButtons && (
                      <>
                        <button 
                          className="btn-accept"
                          onClick={() => handleStatusChange(item.id, 'Active')}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => handleStatusChange(item.id, 'Inactive')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;