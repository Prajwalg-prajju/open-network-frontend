import React from "react";
import instagramIcon from "../assets/social/instagram.png";
import facebookIcon from "../assets/social/instagram.png";
import twitterIcon from "../assets/social/instagram.png";
import linkedinIcon from "../assets/social/instagram.png";
import youtubeIcon from "../assets/social/instagram.png";
import pinterestIcon from "../assets/social/instagram.png";
import snapchatIcon from "../assets/social/instagram.png";
import telegramIcon from "../assets/social/instagram.png";
import tiktokIcon from "../assets/social/instagram.png";
import websiteIcon from "../assets/social/instagram.png";
import whatsappIcon from "../assets/social/instagram.png";


const ICONS = {
  instagram: instagramIcon,
  facebook: facebookIcon,
  twitter: twitterIcon,
  linkedin: linkedinIcon,
  youtube: youtubeIcon,
  pinterest: pinterestIcon,
  snapchat: snapchatIcon,
  telegram: telegramIcon,
  tiktok: tiktokIcon,
  website: websiteIcon,
  whatsapp: whatsappIcon,
  x: twitterIcon, // map X to Twitter icon
};

export default function SocialSection({ socials }) {
  if (!socials) return null;

  const socialArray = Object.entries(socials)
    .filter(([, url]) => url && url.trim() !== "")
    .map(([platform, url]) => ({ platform, url }));

  if (socialArray.length === 0) return null;

  return (
    <div className="social-section">
      {socialArray.map(({ platform, url }) => {
        const iconSrc = ICONS[platform.toLowerCase()];
        if (!iconSrc) return null;

        return (
          <a
            key={platform}
            href={url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            title={platform}
          >
            <img src={iconSrc} alt={platform} className="social-img" />
            <span className="social-name">{platform}</span>
          </a>
        );
      })}
    </div>
  );
}
