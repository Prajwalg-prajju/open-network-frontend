import React from "react";
import "./saveContact.css";
import { saveContact } from "./SaveContactUtils";

export default function SaveContactButton({ user, hidden }) {
  if (hidden) return null; // hide when ShareContact modal opens

  const handleSave = () => {
    saveContact(user);
  };

  return (
    <button className="save-contact-btn" onClick={handleSave}>
      Save Contact
    </button>
  );
}
