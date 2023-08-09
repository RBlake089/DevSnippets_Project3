import React from 'react';
import '../styles.css'; // Import the styles.css file

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to DevSnippets</h1>
        <hr/>
        <p className="home-subtitle">Your one-stop solution for saving code snippets!</p>
      </div>
    </div>
  );
}

export default Home;