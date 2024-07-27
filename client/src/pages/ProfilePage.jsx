import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
import "../styles/Profile.css";
function ProfilePage({ token }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (e) {
        console.error("Failed to get the profile", e);
      }
    };
    fetchProfile();
  }, [token]);
  return (
    <div className="profile-page-container">
      <h2>Profile</h2>
      {profile && (
        <div className="profile-details">
          <p>
            <strong>Username</strong>:{profile.username}
          </p>
          <p>
            <strong>Email</strong>:{profile.email}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
