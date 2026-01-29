// components/SelectedLanguages.jsx
import React from "react";

export default function SelectedLanguage({ languages }) {
  if (!languages || languages.length === 0) return null;
  return (
    <div className="info-card">
      <h3>Languages</h3>
      <div className="languages-list">
        {languages.map((lang, i) => (
          <span key={i} className="language-badge">{lang}</span>
        ))}
      </div>
    </div>
  );
}
