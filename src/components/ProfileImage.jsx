import React from "react";
import { API_BASE_URL } from "../services/apiConfig";

export default function ProfileImage({ url }) {
  if (!url) return null;

  return (
    <div className="profile-image">
      <img
        src={`${API_BASE_URL}${url}`}
        alt="Profile"
      />
    </div>
  );
}
