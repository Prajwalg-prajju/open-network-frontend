import React, { useRef } from "react";
import "./saveContact.css";
import { saveContact } from "./SaveContactUtils";

export default function SaveContactButton({ user }) {
  const fileInputRef = useRef();

  const handleSave = () => {
    // Pass the file input to saveContact
    saveContact(user, fileInputRef.current);
  };

  return (
    <div className="save-contact-wrapper">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="profile-image-input"
      />
      <button className="save-contact-btn" onClick={handleSave}>
        Save Contact
      </button>
    </div>
  );
}
