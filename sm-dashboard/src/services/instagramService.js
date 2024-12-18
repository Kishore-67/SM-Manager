import { INSTAGRAM_CONFIG } from '../config/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v18.0';

export const fetchInstagramData = async () => {
  try {
    const accessToken = INSTAGRAM_CONFIG.accessToken;

    // Fetch user profile
    const profileResponse = await fetch(
      `${INSTAGRAM_API_URL}/me?fields=id,username,media_count&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    if (profileData.error) {
      throw new Error(profileData.error.message);
    }

    // Fetch user media
    const mediaResponse = await fetch(
      `${INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`
    );
    const mediaData = await mediaResponse.json();

    if (mediaData.error) {
      throw new Error(mediaData.error.message);
    }

    // Fetch followers count (this is a placeholder - actual method depends on API access)
    const followersData = await fetchFollowersHistory();

    // Process and format the data
    const processedData = {
      profile: {
        username: profileData.username,
        mediaCount: profileData.media_count,
        id: profileData.id
      },
      recentPosts: mediaData.data?.slice(0, 5).map(post => ({
        type: post.media_type,
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        permalink: post.permalink,
        mediaUrl: post.media_url || post.thumbnail_url,
        caption: post.caption || '',
        timestamp: new Date(post.timestamp).toLocaleDateString()
      })) || [],
      insights: {
        totalLikes: mediaData.data?.reduce((sum, post) => sum + (post.like_count || 0), 0) || 0,
        totalComments: mediaData.data?.reduce((sum, post) => sum + (post.comments_count || 0), 0) || 0,
        engagementRate: mediaData.data?.length ? 
          ((mediaData.data.reduce((sum, post) => sum + ((post.like_count || 0) + (post.comments_count || 0)), 0) / mediaData.data.length) * 100).toFixed(2) + '%'
          : '0%'
      },
      followersHistory: followersData
    };

    return processedData;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    throw error;
  }
};

// Mock function to simulate followers history
const fetchFollowersHistory = async () => {
  // In a real-world scenario, this would fetch actual historical data
  const today = new Date();
  const followersHistory = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate mock follower count with a slight trend
    const baseFollowers = 0;
    const variation = Math.floor(Math.random() * 50) - 25; // Random variation between -25 and +25
    const trendFactor = Math.sin(i * 0.5) * 20; // Add a slight sinusoidal trend
    
    followersHistory.push({
      date: date.toISOString().split('T')[0],
      count: Math.max(baseFollowers + variation + trendFactor, 0)
    });
  }

  return followersHistory;
};

export const getInstagramAuthUrl = (clientId, redirectUri) => {
  const scopes = [
    'instagram_basic',
    'instagram_content_publish',
    'pages_read_engagement',
    'instagram_manage_insights'
  ].join(',');

  return `https://api.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;
};

export const exchangeCodeForToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};
