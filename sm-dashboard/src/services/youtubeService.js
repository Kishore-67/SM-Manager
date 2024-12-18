import { YOUTUBE_CONFIG } from '../config/youtube';

const YOUTUBE_API_BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

export const fetchYouTubeChannelData = async (channelId = YOUTUBE_CONFIG.channelId) => {
  try {
    // Fetch channel details
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUTUBE_CONFIG.apiKey}`
    );
    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }

    // Fetch channel's recent videos
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${YOUTUBE_CONFIG.apiKey}`
    );
    const videosData = await videosResponse.json();

    // Fetch video statistics for each video
    const videoIds = videosData.items.map(video => video.id.videoId).join(',');
    const videoStatsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_CONFIG.apiKey}`
    );
    const videoStatsData = await videoStatsResponse.json();

    // Process channel statistics
    const channelStats = channelData.items[0].statistics;
    const channelSnippet = channelData.items[0].snippet;

    // Process videos with their statistics
    const processedVideos = videosData.items.map(video => {
      const videoStats = videoStatsData.items.find(
        stats => stats.id === video.id.videoId
      )?.statistics || {};

      return {
        id: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        publishedAt: video.snippet.publishedAt,
        views: videoStats.viewCount || 0,
        likes: videoStats.likeCount || 0,
        comments: videoStats.commentCount || 0
      };
    });

    // Generate followers history (using view count as a proxy)
    const followersHistory = generateFollowersHistory(channelStats.viewCount);

    return {
      profile: {
        username: channelSnippet.title,
        description: channelSnippet.description,
        thumbnailUrl: channelSnippet.thumbnails.high.url,
        subscriberCount: channelStats.subscriberCount,
        videoCount: channelStats.videoCount,
        viewCount: channelStats.viewCount
      },
      recentVideos: processedVideos,
      insights: {
        totalViews: channelStats.viewCount,
        totalVideos: channelStats.videoCount,
        averageViews: calculateAverageViews(processedVideos),
        engagementRate: calculateEngagementRate(processedVideos)
      },
      followersHistory: followersHistory
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
};

// Helper function to generate mock followers history
const generateFollowersHistory = (totalViews) => {
  const today = new Date();
  const followersHistory = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate follower count based on total views with some variation
    const baseFollowers = Math.floor(totalViews / 1000);
    const variation = Math.floor(Math.random() * 50) - 25;
    const trendFactor = Math.sin(i * 0.5) * 20;
    
    followersHistory.push({
      date: date.toISOString().split('T')[0],
      count: Math.max(baseFollowers + variation + trendFactor, 0)
    });
  }

  return followersHistory;
};

// Calculate average views across recent videos
const calculateAverageViews = (videos) => {
  if (videos.length === 0) return 0;
  const totalViews = videos.reduce((sum, video) => sum + parseInt(video.views), 0);
  return Math.floor(totalViews / videos.length);
};

// Calculate engagement rate (likes + comments / views)
const calculateEngagementRate = (videos) => {
  if (videos.length === 0) return '0%';
  
  const totalEngagement = videos.reduce((sum, video) => 
    sum + (parseInt(video.likes) + parseInt(video.comments)), 0
  );
  const totalViews = videos.reduce((sum, video) => sum + parseInt(video.views), 0);
  
  const engagementRate = totalViews > 0 
    ? ((totalEngagement / totalViews) * 100).toFixed(2) 
    : '0';
  
  return `${engagementRate}%`;
};
