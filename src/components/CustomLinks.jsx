import React from "react";

export default function CustomLinks({ links = [] }) {
  if (!links.length) return null;

  return (
    <div className="custom-links-wrapper">
      <h3 className="custom-links-title">Links</h3>
      <div className="custom-links">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url ? (link.url.startsWith("http") ? link.url : `https://${link.url}`) : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-link"
          >
            <div className="link-title">{link.name }</div>
          </a>
        ))}
      </div>
    </div>
  );
}
