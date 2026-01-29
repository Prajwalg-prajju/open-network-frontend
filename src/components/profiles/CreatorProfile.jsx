import React from "react";
import BaseProfileLayout from "./BaseProfileLayout";
import ProfileHeader from "../ProfileHeader";
import CoverImage from "../CoverImage";
import ProfileAgeAndGender from "../ProfileAgeAndGender";
import CustomLinks from "../CustomLinks";
import SocialSection from "../SocialSection";
import SaveContactButton from "../saveContact/SaveContactButton";

export default function CreatorProfile({ user }) {
  return (
    <BaseProfileLayout
      user={user}
      header={<ProfileHeader user={user} accountType="creator" />}
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
          <CustomLinks links={user.custom_links} />
          <SocialSection socials={user.social_accounts || {}} />
          <SaveContactButton user={user} />
        </>
      }
    />
  );
}
