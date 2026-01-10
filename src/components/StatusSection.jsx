// components/StatusSection.jsx
import React from "react";

export default function StatusSection({ role, company }) {
  return (
    <div className="info-card">
      <h3>Status</h3>
      <p>Role: {role}</p>
      <p>Company: {company}</p>
    </div>
  );
}
