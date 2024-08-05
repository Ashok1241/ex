import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EngineersList.css';

function BeautyData() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/blist')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setItems([]); // Ensure items is an array
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setItems([]); // Ensure items is an array even on error
      });
  }, []);

  const handleToggleDetails = (item) => {
    setSelectedItem(selectedItem && selectedItem._id === item._id ? null : item);
  };

  return (
    <div className="EngineersList">
      <h1>Items Lists are:</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.fname}</strong>
            <button onClick={() => handleToggleDetails(item)}>
              {selectedItem && selectedItem._id === item._id ? 'Hide Details' : 'Show Details'}
            </button>
            {selectedItem && selectedItem._id === item._id && (
              <div className="details-form">
                <p><strong>ID:</strong> {selectedItem._id}</p>
                <p><strong>First name:   </strong> {selectedItem.fname}</p>
                <p><strong>Last Name:   </strong> {selectedItem.lname}</p>
                <p><strong>Skilll:</strong> {selectedItem.skills}</p>
                <p><strong>Contact:</strong> {selectedItem.contact}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeautyData;
