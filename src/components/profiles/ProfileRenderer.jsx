import React from "react";

import OpenNetworkProfile from "./OpenNetworkProfile";
import BusinessProfile from "./BusinessProfile";
import PersonalProfile from "./PersonalProfile";
import CreatorProfile from "./CreatorProfile";

export default function ProfileRenderer({ user, accountType }) {
  if (!user) return null;
  console.log("ProfileRenderer active, type =", user?.profile_type);


  switch (user.profile_type) {
    case "business":
      return <BusinessProfile user={user} />;

    case "personal":
      return <PersonalProfile user={user} />;

    case "creator":
      return <CreatorProfile user={user} />;

    default:
      return <OpenNetworkProfile user={user} accountType={accountType} />;
  }
  
}
