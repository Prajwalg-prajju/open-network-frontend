import React from "react";
import ProfileHeader from "./ProfileHeader";
import CoverImage from "./CoverImage";
import ProfileImage from "./ProfileImage";
import ProfileAgeAndGender from "./ProfileAgeAndGender";
import BasicInfo from "./BasicInfo";
import StatusSection from "./StatusSection";
import SelectedLanguage from "./SelectedLanguages";
import CustomLinks from "./CustomLinks";
import Document from "./Documents";
import SocialSection from "./SocialSection";
import AddressSection from "./AddressSection";
import UPIPaymentButton from "./UPIPaymentButton";
import ContactInfo from "./ContactInfo";
import SaveContactButton from "./saveContact/SaveContactButton"
import "../styles/other.css"

export default function HeaderProfile({ user, accountType }) {
  return (
    <div className="profile-card-wrapper">

      <ProfileHeader user={user} accountType={accountType} />

      <CoverImage url={user.cover_image} />

      <ProfileAgeAndGender
        name={user.name}
        namelocation={user.namelocation}
        bio={user.bio}
        profileUrl={user.profile_image}
        gender={user.gender}
        birthYear={Number(user.birth_year)}
      />

      <div className="profile-sections">
        <BasicInfo
          statusType={user.status_type}
          fillOne={user.fillone}
          fillTwo={user.filltwo}
        />

        <SelectedLanguage
          languages={user.selected_languages || []}
        />

        <Document
          documents={user.documents || []}
        />

        <CustomLinks links={user.custom_links} />

        <ContactInfo
          phone={user.phone_number}
          email={user.email}
          emergency={user.emergency_number}
        />

        <UPIPaymentButton
          upiId={user.upi_id}
        />

        <AddressSection
          address={user.address}
          lat={user.lat}
          lng={user.lng}
        />


        <SocialSection
          socials={user.social_accounts || {}}
        />
        <SaveContactButton user={user} />

      </div>
    </div>
  );
}
