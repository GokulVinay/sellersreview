import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Import the updated CSS file

const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://int9solutions-assignment-1.onrender.com";
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

function Home() {
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/sellers?name=${search}`);
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers', error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers, search]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i} className={`star ${i > rating ? 'empty' : ''}`}></div>
      );
    }
    return stars;
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="header">
        <div className="logo">
          <h1>Seller List</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="/home" className="nav-link">Home</a></li>
            <li><a href="/about" className="nav-link">About</a></li>
            <li><a href="/contact" className="nav-link">Contact Us</a></li>
            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="home-content">
        <input
          type="text"
          placeholder="Search sellers by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        
        <div className="seller-list">
          {sellers.map((seller) => (
            <div key={seller._id} className="seller-item">
              <div className="seller-name">{seller.name}</div>
              <div className="seller-rating">
                {renderStars(seller.rating)}
              </div>
              <div className="seller-review">{seller.review}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
