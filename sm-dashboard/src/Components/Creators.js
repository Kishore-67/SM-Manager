import React from 'react';
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import AIAssistant from './Other/AIAssistant';
import ThumbnailGenerator from './Other/Thumbnailgenerator';
import '../Styles/Creator.css';

function Creator() {
  return (
    <div className="App">
      <nav className="app-nav">
        <Link to="/creators" className="nav-link">Home</Link>
        <Link to="/creators/thumbnails" className="nav-link">Create Images</Link>
        <Link to="/creators/assistant" className="nav-link">AI Assistant</Link>
      </nav>

      <Routes>
        <Route index element={
          <div className="landing-content">
            <h1>Welcome to Your Creative Space</h1>
            <p>Create engaging content for your social media with the power of AI</p>
            
            <div className="feature-buttons">
              <Link to="/creators/assistant" className="feature-button content-button">
                Generate Content
              </Link>
              <Link to="/creators/thumbnails" className="feature-button thumbnail-button">
                Create Thumbnails
              </Link>
            </div>
          </div>
        } />
        <Route path="thumbnails" element={<ThumbnailGenerator />} />
        <Route path="assistant" element={<AIAssistant />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default Creator;
