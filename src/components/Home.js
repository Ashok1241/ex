import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import sampleData from './data'; 

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter data based on search query
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = sampleData.filter(item =>
        item.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(sampleData);
    }
  }, [searchQuery]);

  const handleImageClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="home-container">
      <header className="header">
        <input
          type="text"
          className="search"
          placeholder="Search facilities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="sb" onClick={() => setSearchQuery(searchQuery)}>Search</button>
        <button className="ho" onClick={() => navigate('/')}>Home</button>
        <b className="hom" onClick={() => navigate('/about')}>About Us</b>
        <b className="hom" onClick={() => navigate('/contact')}>Contact Us</b>
        <button className="hom" onClick={() => navigate('/profile')}>Profile</button>
      </header>
      <div className="container">
        {filteredData.map(item => (
          <div className="image-container" key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.name}
              onClick={() => handleImageClick(item.id)} // Handle image click
            />
            <button onClick={() => handleImageClick(item.id)}>{item.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
