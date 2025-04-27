import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// src/pages/Profile.js
const Profile = ({currentUser}) => {
    return (
      <div className="profilePage">
        <h2>{currentUser}'s Profile</h2>
        <p>Email: {currentUser}</p>
        {/* Add more profile info */}
      </div>
    );
  };

  export default Profile