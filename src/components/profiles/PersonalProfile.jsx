import React from "react";
import BaseProfileLayout from "./BaseProfileLayout";
import ProfileHeader from "../ProfileHeader";
import CoverImage from "../CoverImage";
import ProfileAgeAndGender from "../ProfileAgeAndGender";
import SelectedLanguage from "../SelectedLanguages";
import SocialSection from "../SocialSection";

export default function PersonalProfile({ user }) {
  return (
    <BaseProfileLayout
      user={user}
      header={<ProfileHeader user={user} accountType="personal" />}
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
          <SelectedLanguage languages={user.selected_languages || []} />
          <SocialSection socials={user.social_accounts || {}} />
        </>
      }
    />
  );
}
