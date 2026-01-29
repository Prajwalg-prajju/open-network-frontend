import React from "react";
import BaseProfileLayout from "./BaseProfileLayout";
import ProfileHeader from "../ProfileHeader";
import CoverImage from "../CoverImage";
import ProfileAgeAndGender from "../ProfileAgeAndGender";
import ContactInfo from "../ContactInfo";
import AddressSection from "../AddressSection";
import SocialSection from "../SocialSection";

export default function BusinessProfile({ user }) {
  return (
    <BaseProfileLayout
      user={user}
      header={<ProfileHeader user={user} accountType="business" />}
      cover={<CoverImage url={user.cover_image} />}
      info={
        <ProfileAgeAndGender
          name={user.name}
          namelocation={user.namelocation}
          bio={user.bio}
          profileUrl={user.profile_image}
        />
      }
      sections={
        <>
          <ContactInfo phone={user.phone_number} email={user.email} />
          <AddressSection address={user.address} lat={user.lat} lng={user.lng} />
          <SocialSection socials={user.social_accounts || {}} />
        </>
      }
    />
  );
}
