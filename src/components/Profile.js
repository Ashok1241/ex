import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; 

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile visibility
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const storedUsername = localStorage.getItem('username');
      
      if (!storedUsername) {
        setError('Not authenticated');
        navigate('/login');
      } else {
        setUsername(storedUsername);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile); // Toggle profile visibility
    if (!showProfile && username) {
      axios.get(`http://localhost:8000/profile?username=${username}`)
        .then(response => {
          console.log(response.data);
          setData(response.data || {});
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setData({});
        });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <button className="profile-button" onClick={handleProfileClick}>
        {showProfile ? 'Hide Profile' : 'Show Profile'}
      </button>
      {showProfile && (
        <div className="profile-box">
          <p><strong>Username:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
        </div>
      )}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
