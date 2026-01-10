import { API_BASE_URL } from "../services/apiConfig";

export default function Document({ documents }) {
  // Ensure documents is always an array
  const docs = Array.isArray(documents) ? documents : [];

  // If no files uploaded, don't render the card
  if (docs.length === 0) return null;

  return (
    <div className="info-card">
      <h3>Documents</h3>

      {docs.map((doc, index) => (
        <a
          key={index}
          href={`${API_BASE_URL}${doc.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="document-link"
        >
          📄 {doc.name || `Document ${index + 1}`}
        </a>
      ))}
    </div>
  );
}
