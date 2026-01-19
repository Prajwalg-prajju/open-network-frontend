import React from "react";
import copyIcon from "../assets/social/copy.svg";
import phoneIcon from "../assets/social/phone.svg";
import emailIcon from "../assets/social/email.svg";

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
            <img src={phoneIcon} alt="Phone" className="contact-asset" />
            <span className="contact-value">{phone}</span>

            <button
              className="copy-icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(phone);
              }}
              title="Copy phone number"
            >
              <img src={copyIcon} alt="Copy" className="copy-icon-img" />
            </button>
          </a>
        </div>
      )}

      {/* EMAIL */}
      {email && (
        <div className="contact-row">
          <a href={`mailto:${email}`} className="contact-text">
            <img src={emailIcon} alt="Email" className="contact-asset" />
            <span className="contact-value">{email}</span>

            <button
              className="copy-icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(email);
              }}
              title="Copy email"
            >
              <img src={copyIcon} alt="Copy" className="copy-icon-img" />
            </button>
          </a>
        </div>
      )}

      {/* EMERGENCY */}
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
