import React from "react";
import ProfileSkeleton from "../ProfileSkeleton";

export default function BaseProfileLayout({ user, header, cover, info, sections }) {
  if (!user) return <ProfileSkeleton />;

  return (
    <div className="profile-card-wrapper">
      {header}
      {cover}
      {info}

      <div className="profile-sections">
        {sections}
      </div>
    </div>
  );
}
