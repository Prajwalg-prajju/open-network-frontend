import React from "react";
import "./saveContact.css";
import { saveContact } from "./SaveContactUtils";

export default function SaveContactButton({ user }) {
  const handleSave = () => {
    saveContact(user);
  };

  return (
    <button className="save-contact-btn" onClick={handleSave}>
      💾 Save Contact
    </button>
  );
}
