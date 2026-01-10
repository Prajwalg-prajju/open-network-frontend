// components/ContactInfo.jsx
import React from "react";

export default function ContactInfo({ phone, email, emergency }) {
  if (!phone && !email && !emergency) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="info-card contact-info">

      {/* PHONE */}
      {phone && (
        <div className="contact-row">
          <a href={`tel:${phone}`} className="contact-text">
            📞 {phone}
          </a>

          <button
            className="copy-icon"
            onClick={() => copyToClipboard(phone)}
            title="Copy phone number"
          >
            📋
          </button>
        </div>
      )}

      {/* EMAIL */}
      {email && (
        <div className="contact-row">
          <a href={`mailto:${email}`} className="contact-text">
            ✉️ {email}
          </a>

          <button
            className="copy-icon"
            onClick={() => copyToClipboard(email)}
            title="Copy email"
          >
            📋
          </button>
        </div>
      )}

      {/* EMERGENCY (SEPARATE) */}
      {emergency && (
        <div className="emergency-wrapper">
          <a href={`tel:${emergency}`} className="emergency-btn">
            Emergency call
          </a>
        </div>
      )}

    </div>
  );
}
