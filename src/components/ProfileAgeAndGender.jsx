import React from "react";
import { API_BASE_URL } from "../services/apiConfig";

export default function ProfileAgeAndGender({
  name,
  namelocation,
  bio,
  profileUrl,

}) {
  return (
    <div className="profile-info">
      <img
        className="profile-image-avatar"
        src={profileUrl ? `${API_BASE_URL}${profileUrl}` : "/default-avatar.png"}
        alt={name}
      />

      <div className="profile-text">
        <h2>{name}</h2>

        {location && (
            <span className="profile-location">📍{namelocation}</span>
          )}
        <p className="bio-of_profile">{bio}</p>
      </div>
    </div>
  );
}
