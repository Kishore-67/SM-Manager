import React, { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaSearch, FaFilter } from 'react-icons/fa';
import { BsPerson, BsEye, BsGeoAlt, BsTags } from 'react-icons/bs';
import { IoMdPeople } from 'react-icons/io';
import '../../Styles/Brand.css';

const Brand = () => {
  const [platform, setPlatform] = useState('Instagram');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCreatorType, setSelectedCreatorType] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [requestedInfluencers, setRequestedInfluencers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'category', direction: 'ascending' });

  const [influencers, setInfluencers] = useState([
    {
      id: 1,
      name: 'Muna Gauchan',
      language: 'Other',
      followers: '999.9 K',
      er: '0.2%',
      avgViews: '35.3 K',
      avgEngagement: '16.6 K',
      location: 'Mumbai',
      category: 'Fashion',
      gender: 'Female',
      creatorType: 'Lifestyle',
      priceRange: '₹50K - ₹100K'
    },
    {
      id: 2,
      name: 'YASH SHARMA',
      language: 'English',
      followers: '992 K',
      er: '7.66%',
      avgViews: '153.3 K',
      avgEngagement: '35.1 K',
      location: 'Old Delhi',
      category: 'Fashion',
      gender: 'Male',
      creatorType: 'Fashion',
      priceRange: '₹100K - ₹150K'
    },
    {
      id: 3,
      name: 'Shreema Bhattacherjee',
      language: 'Bengali',
      followers: '990.8 K',
      er: '0.0%',
      avgViews: '66.8 K',
      avgEngagement: '22 K',
      location: 'Kolkata',
      category: 'Fashion',
      gender: 'Female',
      creatorType: 'Beauty',
      priceRange: '₹75K - ₹125K'
    },
    {
        "id": 4,
        "name": "Arjun Verma",
        "language": "Tamil",
        "followers": "1.5 M",
        "er": "1.8%",
        "avgViews": "60.5 K",
        "avgEngagement": "30.2 K",
        "location": "Chennai",
        "category": "Fitness",
        "gender": "Male",
        "creatorType": "Personal Trainer",
        "priceRange": "₹100K - ₹200K"
      },
      {
        "id": 5,
        "name": "Neha Kapoor",
        "language": "Bengali",
        "followers": "600.3 K",
        "er": "2.3%",
        "avgViews": "25.1 K",
        "avgEngagement": "15.6 K",
        "location": "Kolkata",
        "category": "Travel",
        "gender": "Female",
        "creatorType": "Vlogger",
        "priceRange": "₹40K - ₹90K"
      },
      {
        "id": 6,
        "name": "Kabir Das",
        "language": "Punjabi",
        "followers": "750.2 K",
        "er": "0.7%",
        "avgViews": "35.6 K",
        "avgEngagement": "14.8 K",
        "location": "Amritsar",
        "category": "Music",
        "gender": "Male",
        "creatorType": "Singer",
        "priceRange": "₹50K - ₹120K"
      },
      {
        "id": 7,
        "name": "Ananya Roy",
        "language": "English",
        "followers": "1.8 M",
        "er": "1.5%",
        "avgViews": "75.2 K",
        "avgEngagement": "40.7 K",
        "location": "Hyderabad",
        "category": "Fashion",
        "gender": "Female",
        "creatorType": "Model",
        "priceRange": "₹150K - ₹250K"
      },
      {
        "id": 8,
        "name": "Vikram Mehta",
        "language": "Marathi",
        "followers": "950.4 K",
        "er": "1.0%",
        "avgViews": "45.7 K",
        "avgEngagement": "22.3 K",
        "location": "Pune",
        "category": "Photography",
        "gender": "Male",
        "creatorType": "Photographer",
        "priceRange": "₹60K - ₹110K"
      },
      {
        "id": 9,
        "name": "Priya Singh",
        "language": "Gujarati",
        "followers": "500.9 K",
        "er": "2.0%",
        "avgViews": "20.4 K",
        "avgEngagement": "12.5 K",
        "location": "Ahmedabad",
        "category": "Lifestyle",
        "gender": "Female",
        "creatorType": "Blogger",
        "priceRange": "₹25K - ₹70K"
      },
      {
        "id": 10,
        "name": "Rohan Iyer",
        "language": "Kannada",
        "followers": "1.1 M",
        "er": "0.6%",
        "avgViews": "55.3 K",
        "avgEngagement": "18.7 K",
        "location": "Mysore",
        "category": "Gaming",
        "gender": "Male",
        "creatorType": "Streamer",
        "priceRange": "₹90K - ₹180K"
      }
  ]);

  const locations = ['Mumbai', 'Old Delhi', 'Kolkata', 'Bangalore', 'Chennai'];
  const genders = ['Male', 'Female', 'Other'];
  const creatorTypes = ['Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Food'];

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSortChange = (e) => {
    setSortConfig({ key: e.target.value, direction: 'ascending' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInfluencers(influencers.map(inf => inf.id));
    } else {
      setSelectedInfluencers([]);
    }
  };

  const handleSelectInfluencer = (id) => {
    setSelectedInfluencers(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRequest = (influencerId) => {
    setRequestedInfluencers(prev => {
      if (prev.includes(influencerId)) {
        return prev.filter(id => id !== influencerId);
      } else {
        return [...prev, influencerId];
      }
    });
  };

  const filterInfluencers = () => {
    return influencers.filter(inf => {
      const matchesSearch = inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inf.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !selectedLocation || inf.location === selectedLocation;
      const matchesGender = !selectedGender || inf.gender === selectedGender;
      const matchesCreatorType = !selectedCreatorType || inf.creatorType === selectedCreatorType;
      
      return matchesSearch && matchesLocation && matchesGender && matchesCreatorType;
    });
  };

  const sortedInfluencers = () => {
    const filtered = filterInfluencers();
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Convert string numbers with K to actual numbers for proper sorting
      if (sortConfig.key === 'followers' || sortConfig.key === 'avgViews' || sortConfig.key === 'avgEngagement') {
        aValue = parseFloat(aValue.replace('K', '')) * 1000;
        bValue = parseFloat(bValue.replace('K', '')) * 1000;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    
    <div className="brand-container">
      
      <h1 className="title">Discover Influencers for your Brand</h1>
      <p className="subtitle">Discover from 20,00,000+ influencers across India on YouTube and Instagram</p>

      <div className="search-section">
        <div className="platform-selector">
          <span>Platform</span>
          <div className="platform-dropdown" onClick={() => setPlatform(platform === 'Instagram' ? 'YouTube' : 'Instagram')}>
            {platform === 'Instagram' ? <FaInstagram className="platform-icon" /> : <FaYoutube className="platform-icon" />}
            <span>{platform}</span>
          </div>
        </div>
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by link, keywords, username, influencer name and categories or add a new influencer link"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="reset-btn" onClick={() => {
          setSearchQuery('');
          setSelectedLocation('');
          setSelectedGender('');
          setSelectedCreatorType('');
        }}>Reset</button>
      </div>

      <div className="filters-section">
        <select 
          className="filter-dropdown"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Location</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select 
          className="filter-dropdown"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">Gender</option>
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        <select 
          className="filter-dropdown"
          value={selectedCreatorType}
          onChange={(e) => setSelectedCreatorType(e.target.value)}
        >
          <option value="">Creator Type</option>
          {creatorTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button 
          className={`advanced-filters-btn ${showAdvancedFilters ? 'active' : ''}`}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FaFilter /> Advanced Filters
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="advanced-filters-panel">
          <h3>Advanced Filters</h3>
          <div className="advanced-filters-content">
            <div className="filter-group">
              <label>Follower Range</label>
              <div className="range-inputs">
                <input type="number" placeholder="Min" />
                <input type="number" placeholder="Max" />
              </div>
            </div>
            <div className="filter-group">
              <label>Engagement Rate</label>
              <div className="range-inputs">
                <input type="number" placeholder="Min %" />
                <input type="number" placeholder="Max %" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="influencers-section">
        <div className="influencers-header">
          <h2>INFLUENCERS ({sortedInfluencers().length})</h2>
          <select 
            className="sort-dropdown"
            value={sortConfig.key}
            onChange={handleSortChange}
          >
            <option value="category">Category</option>
            <option value="followers">Followers</option>
            <option value="avgViews">Average Views</option>
            <option value="avgEngagement">Average Engagement</option>
            <option value="location">Location</option>
            <option value="priceRange">Price Range</option>
          </select>
        </div>

        <table className="influencers-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectedInfluencers.length === influencers.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort('name')} className="sortable-header">
                <BsPerson /> Profile
                {sortConfig.key === 'name' && (
                  <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('followers')} className="sortable-header">
                <IoMdPeople /> Followers
                {sortConfig.key === 'followers' && (
                  <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('avgViews')} className="sortable-header">
                <BsEye /> Avg Views
                {sortConfig.key === 'avgViews' && (
                  <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('avgEngagement')} className="sortable-header">
                Avg Engagement
                {sortConfig.key === 'avgEngagement' && (
                  <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th><BsGeoAlt /> Location</th>
              <th><BsTags /> Categories</th>
              <th onClick={() => handleSort('priceRange')} className="sortable-header">
                Price Range
                {sortConfig.key === 'priceRange' && (
                  <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedInfluencers().map((influencer) => (
              <tr 
                key={influencer.id}
                className={selectedInfluencers.includes(influencer.id) ? 'selected' : ''}
              >
                <td>
                  <input 
                    type="checkbox"
                    checked={selectedInfluencers.includes(influencer.id)}
                    onChange={() => handleSelectInfluencer(influencer.id)}
                  />
                </td>
                <td>
                  <div className="profile-cell">
                    <div className="profile-info">
                      <span className="influencer-name">{influencer.name}</span>
                      <span className="influencer-language">{influencer.language}</span>
                    </div>
                  </div>
                </td>
                <td>{influencer.followers}</td>
                <td>{influencer.avgViews}</td>
                <td>{influencer.avgEngagement}</td>
                <td>{influencer.location}</td>
                <td><span className="category-tag">{influencer.category}</span></td>
                <td><span className="price-tag">{influencer.priceRange}</span></td>
                <td>
                  <button 
                    className={`request-btn ${requestedInfluencers.includes(influencer.id) ? 'requested' : ''}`}
                    onClick={() => handleRequest(influencer.id)}
                  >
                    {requestedInfluencers.includes(influencer.id) ? 'Requested' : 'Request'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Brand;