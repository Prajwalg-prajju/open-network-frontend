// components/BasicInfo.jsx
import React from "react";

export default function BasicInfo({ statusType, fillOne, fillTwo }) {
  const renderIcon = () => {
    if (statusType === "job") return "💼";
    if (statusType === "studying") return "🎓";
    return null;
  };

  return (
    <div className="info-card">
      <p className="info-line">
        <span className="info-icon">{renderIcon()}</span>
        <span className="info-text">{fillOne}</span>
      </p>

      {fillTwo && (
        <p className="info-sub">
          {fillTwo}
        </p>
      )}
    </div>
  );
}
