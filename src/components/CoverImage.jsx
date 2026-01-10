import React from "react";
import { API_BASE_URL } from "../services/apiConfig";

export default function CoverImage({ url }) {
  if (!url) return null;

  return (
    <div className="cover-image">
      <img
        src={`${API_BASE_URL}${url}`}
        alt="Cover"
      />
    </div>
  );
}
