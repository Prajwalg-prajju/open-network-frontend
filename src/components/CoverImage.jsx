import React from "react";
import { API_BASE_URL } from "../services/apiConfig";

export default function CoverImage({ url, birthYear, gender }) {
  if (!url) return null;

  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - birthYear : null;

  return (
    <div className="cover-section">
      <img
        className="cover-image"
        src={`${API_BASE_URL}${url}`}
        alt="Cover"
      />

      <div className="cover-badges">
        {gender && <span className="cover-left">{gender}</span>}
        {age && <span className="cover-right">{age} Y</span>}
      </div>
    </div>
  );
}
