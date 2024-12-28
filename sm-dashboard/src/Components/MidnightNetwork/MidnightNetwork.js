import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MidnightNetwork.css';

const MidnightNetwork = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const categories = [
    'general',
    'tech',
    'creative',
    'career',
    'wellness',
    'advice',
    'confessions'
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/midnight/${selectedCategory}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const postData = {
        content: newPost,
        category: selectedCategory,
        isAnonymous,
        timestamp: new Date(),
        // You might want to get this from your auth system
        userId: localStorage.getItem('userId') || 'anonymous'
      };

      await axios.post('http://localhost:5000/api/midnight/posts', postData);
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/midnight/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`http://localhost:5000/api/midnight/posts/${postId}/comments`, {
        content: comment,
        userId: localStorage.getItem('userId') || 'anonymous'
      });
      fetchPosts();
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div className="midnight-network">
      <div className="midnight-header">
        <h1>Midnight Network</h1>
        <p>Share your thoughts, connect with peers, stay anonymous</p>
      </div>

      <div className="post-creation">
        <form onSubmit={handleSubmit}>
          <div className="post-options">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Post Anonymously
            </label>
          </div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
          />
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="posts-container">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <span className="author">
                {post.isAnonymous ? 'Anonymous' : post.userName}
              </span>
              <span className="category">{post.category}</span>
              <span className="timestamp">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button onClick={() => handleLike(post._id)}>
                ❤️ {post.likes || 0}
              </button>
              <button onClick={() => {
                const comment = prompt('Enter your comment:');
                if (comment) handleComment(post._id, comment);
              }}>
                💬 {post.comments?.length || 0}
              </button>
            </div>
            {post.comments && post.comments.length > 0 && (
              <div className="comments-section">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <span className="comment-author">
                      {comment.isAnonymous ? 'Anonymous' : comment.userName}:
                    </span>
                    <span className="comment-content">{comment.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MidnightNetwork;
