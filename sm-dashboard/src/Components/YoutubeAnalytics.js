import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { YOUTUBE_API_KEY, CHANNEL_ID } from '../config';
import '../Styles/YoutubeAnalytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const YoutubeAnalytics = () => {
  const [channelStats, setChannelStats] = useState({
    subscriberCount: '0',
    viewCount: '0',
    videoCount: '0',
    channelName: 'Loading...'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        // Validate API key and Channel ID
        if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'DEMO_KEY') {
          throw new Error('Invalid or missing YouTube API Key');
        }

        if (!CHANNEL_ID || CHANNEL_ID === 'DEMO_CHANNEL') {
          throw new Error('Invalid or missing YouTube Channel ID');
        }

        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
        
        console.log('Fetching YouTube data with:', {
          url: channelUrl,
          channelId: CHANNEL_ID,
          apiKeyPresent: !!YOUTUBE_API_KEY
        });

        const response = await axios.get(channelUrl, {
          headers: {
            'Accept': 'application/json'
          }
        });

        console.log('Full API Response:', response.data);

        if (!response.data.items || response.data.items.length === 0) {
          throw new Error('No channel data found. Please check your Channel ID.');
        }

        const channelData = response.data.items[0];
        const stats = channelData.statistics;
        const snippet = channelData.snippet;

        setChannelStats({
          subscriberCount: stats.subscriberCount,
          viewCount: stats.viewCount,
          videoCount: stats.videoCount,
          channelName: snippet.title
        });
      } catch (err) {
        console.error('YouTube API Error:', {
          message: err.message,
          response: err.response ? err.response.data : 'No response',
          status: err.response ? err.response.status : 'N/A'
        });

        let errorMessage = 'Failed to fetch YouTube data';
        if (err.response) {
          // More specific error handling based on status code
          switch (err.response.status) {
            case 400:
              errorMessage = 'Bad Request: Check your API key and Channel ID';
              break;
            case 403:
              errorMessage = 'Forbidden: API key may be invalid or quota exceeded';
              break;
            case 404:
              errorMessage = 'Not Found: Channel ID may be incorrect';
              break;
            default:
              errorMessage = err.response.data.error?.message || errorMessage;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  if (loading) {
    return (
      <div className="youtube-analytics-container">
        <div className="loading-spinner">Loading YouTube Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="youtube-analytics-container">
        <div className="error-message">
          <h3>Error Fetching YouTube Data</h3>
          <p>{error}</p>
          <div className="error-details">
            <p>Possible reasons:</p>
            <ul>
              <li>Invalid API Key</li>
              <li>Incorrect Channel ID</li>
              <li>YouTube API Quota Exceeded</li>
              <li>Network Connection Issues</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="youtube-analytics-container">
      <div className="channel-name">{channelStats.channelName}</div>
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-header">Subscribers</div>
          <div className="card-content">
            <div className="big-number">{channelStats.subscriberCount}</div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">Views</div>
          <div className="card-content">
            <div className="big-number">{channelStats.viewCount}</div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">Videos</div>
          <div className="card-content">
            <div className="big-number">{channelStats.videoCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeAnalytics;
