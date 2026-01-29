// components/profiles/ShareContact.jsx
import React, { useState } from "react";

export default function ShareContact({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { sharedBy: userId, name, phone, email, note };
    console.log("Sharing contact:", payload);

    setSubmitted(true);
    setIsOpen(false);
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
  };

  return (
    <div className="share-contact-wrapper">
      <button className="share-contact-btn-main" onClick={() => setIsOpen(true)}>
        Share Your Contact
      </button>

      {isOpen && (
        <div className="share-contact-modal">
          <div className="share-contact-content">
            <h3>Share Your Contact</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Add a note (max 100 words)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={600}
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="success-message">
          Contact shared successfully!
        </div>
      )}
    </div>
  );
}
