// src/pages/Profile.js
const Profile = ({ user }) => {
    return (
      <div className="profilePage">
        <h2>{user.username}'s Profile</h2>
        <p>Email: {user.email}</p>
        {/* Add more profile info */}
      </div>
    );
  };