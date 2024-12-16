import React, { useState } from 'react';
import '../Styles/Profile.css';
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    role: 'Social Media Manager',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced social media manager with a passion for digital marketing and content creation.',
    socialLinks: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      instagram: '@johndoe.social'
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to a backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar-section">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&size=200&background=0D8ABC&color=fff"
            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-title">
            <h1>{userData.name}</h1>
            <p>{userData.role}</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            {!isEditing ? (
              <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
            ) : (
              <button className="save-button" onClick={handleSave}>Save Changes</button>
            )}
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.name}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>

            <div className="info-item">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            <div className="info-item">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.location}</p>
              )}
            </div>
          </div>

          <div className="bio-section">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                rows="4"
              />
            ) : (
              <p>{userData.bio}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Social Links</h2>
          <div className="social-links">
            <div className="social-item">
              <label>Twitter</label>
              {isEditing ? (
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={userData.socialLinks.twitter}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.socialLinks.twitter}</p>
              )}
            </div>

            <div className="social-item">
              <label>LinkedIn</label>
              {isEditing ? (
                <input
                  type="text"
                  name="socialLinks.linkedin"
                  value={userData.socialLinks.linkedin}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.socialLinks.linkedin}</p>
              )}
            </div>

            <div className="social-item">
              <label>Instagram</label>
              {isEditing ? (
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={userData.socialLinks.instagram}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData.socialLinks.instagram}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
