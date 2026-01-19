import React from "react";
import copyIcon from "../assets/social/copy.svg";

export default function AddressSection({ address, lat, lng }) {
  if (!address && !lat && !lng) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  let mapLink = "#";

  if (lat && lng) {
    mapLink = isIOS
      ? `maps://?q=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  } else if (address) {
    mapLink = isIOS
      ? `maps://?q=${encodeURIComponent(address)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  return (
    <div className="info-card address-card">
      <div className="address-header">
        <h3>📍 Location</h3>

        {address && (
          <button
            className="address-copy-icon"
            onClick={() => copyToClipboard(address)}
            title="Copy address"
            type="button"
          >
            <img src={copyIcon} alt="Copy" className="address-copy-img" />
          </button>
        )}
      </div>

      {address && <p className="address-text">{address}</p>}

      <a
        href={mapLink}
        target="_blank"
        rel="noreferrer"
        className="get-directions-btn"
      >
        Get Directions
      </a>
    </div>
  );
}
