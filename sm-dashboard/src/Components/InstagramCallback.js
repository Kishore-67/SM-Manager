import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeCodeForToken } from '../services/instagramService';
import { INSTAGRAM_CONFIG } from '../config/instagram';

const InstagramCallback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        const accessToken = await exchangeCodeForToken(
          code,
          INSTAGRAM_CONFIG.clientId,
          INSTAGRAM_CONFIG.clientSecret,
          INSTAGRAM_CONFIG.redirectUri
        );

        localStorage.setItem('instagram_access_token', accessToken);
        navigate('/dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to authenticate with Instagram. Please try again.');
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (error) {
    return (
      <div className="instagram-callback-error">
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="instagram-callback-loading">
      <h2>Connecting to Instagram...</h2>
      <div className="loader"></div>
    </div>
  );
};

export default InstagramCallback;
