import React from "react";


export default function ProfileHeader({ accountType }) {
  return (
    <div className="top-identity-bar">
      <div className="identity-left">
        <span className="account-type-text">
          {accountType?.replace("_", " ").toUpperCase()}
        </span>
      </div>

    </div>
  );
}
