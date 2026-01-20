import { API_BASE_URL } from "../services/apiConfig";
import React, { useState } from "react";

export default function Document({ documents }) {
  const docs = Array.isArray(documents) ? documents : [];
  const [openDoc, setOpenDoc] = useState(null);

  if (docs.length === 0) return null;

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = (url) => {
    if (isMobile) {
      // On mobile → open directly in same page
      window.location.href = url;
    } else {
      // On desktop → open modal
      setOpenDoc(url);
    }
  };

  return (
    <div className="info-card">
      <h3>Documents</h3>

      {docs.map((doc, index) => {
        const url = `${API_BASE_URL}${doc.url}`;
        return (
          <div key={index}>
            <span
              className="document-link"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(url)}
            >
              📄 {doc.name || `Document ${index + 1}`}
            </span>
          </div>
        );
      })}

      {/* Modal only for desktop */}
      {!isMobile && openDoc && (
        <div className="document-modal">
          <button
            className="close-modal"
            onClick={() => setOpenDoc(null)}
            aria-label="Close document"
          >
            ✕
          </button>

          <iframe
            src={openDoc}
            title="Document Viewer"
            className="document-iframe"
          />
        </div>
      )}
    </div>
  );
}
