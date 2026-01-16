import React from "react";
import instagramIcon from "../assets/social/iinstagram.png";
import facebookIcon from "../assets/social/facebook.png";
import twitterIcon from "../assets/social/twitterr.png";
import linkedinIcon from "../assets/social/linkdin.png";
import youtubeIcon from "../assets/social/youtube.png";
import pinterestIcon from "../assets/social/pintrest.png";
import snapchatIcon from "../assets/social/snapshot.png";
import telegramIcon from "../assets/social/telegram.png";
import tiktokIcon from "../assets/social/tiktok.png";
import websiteIcon from "../assets/social/web.png";
import whatsappIcon from "../assets/social/whatsapp.png";

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
  x: twitterIcon,
};

const BASE_URLS = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  twitter: "https://twitter.com/",
  x: "https://x.com/",
  linkedin: "https://www.linkedin.com/in/",
  youtube: "https://www.youtube.com/",
  pinterest: "https://pinterest.com/",
  snapchat: "https://www.snapchat.com/add/",
  telegram: "https://t.me/",
  tiktok: "https://www.tiktok.com/@",
  whatsapp: "https://wa.me/",
  website: "",
};

function buildLink(platform, value) {
  if (!value) return "#";

  // already full url
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const base = BASE_URLS[platform.toLowerCase()] || "";
  return base + value.replace(/^@/, "");
}

export default function SocialSection({ socials }) {
  if (!socials) return null;

  const socialArray = Object.entries(socials)
    .filter(([, url]) => url && url.trim() !== "")
    .map(([platform, url]) => ({ platform, url }));

  if (socialArray.length === 0) return null;

  return (
    <div className="social-section">
      {socialArray.map(({ platform, url }) => {
        const key = platform.toLowerCase();
        const iconSrc = ICONS[key];
        if (!iconSrc) return null;

        const finalUrl = buildLink(key, url);

        return (
          <a
            key={platform}
            href={finalUrl}
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
