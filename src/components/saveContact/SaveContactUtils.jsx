import { API_BASE_URL } from "../../services/apiConfig";

// Convert remote profile image to Base64
async function fetchProfileImageBase64(profileUrl) {
  if (!profileUrl) return "";

  try {
    const url = `${API_BASE_URL}${profileUrl}`;
    const res = await fetch(url, { mode: "cors" }); // CORS must be enabled on server
    if (!res.ok) return "";

    const blob = await res.blob();

    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(blob);
    });

    const maxSize = 150;
    let { width, height } = img;

    if (width > height) {
      if (width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
    const base64 = dataUrl.split(",")[1];

    return base64.match(/.{1,74}/g).join("\r\n ");
  } catch (err) {
    console.warn("Profile image fetch/compress failed", err);
    return "";
  }
}

// Save contact as vCard
export async function saveContact(user) {
  const profileLink = `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.user_id}`;
  const photoBase64 = await fetchProfileImageBase64(user.profile_image);

  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${user.name || ""};;;`,
    `FN:${user.name || ""}`,
    user.phone_number ? `TEL;CELL:${user.phone_number}` : "",
    // user.emergency_number ? `TEL;VOICE:${user.emergency_number}` : "",
    user.email ? `EMAIL:${user.email}` : "",
    user.address ? `ADR:;;${user.address};;;;` : "",
    `URL:${profileLink}`,
    user.social_accounts?.website ? `URL:${user.social_accounts.website}` : "",
    user.social_accounts?.instagram ? `URL:${user.social_accounts.instagram}` : "",
    user.social_accounts?.linkedin ? `URL:${user.social_accounts.linkedin}` : "",
    user.social_accounts?.x ? `URL:${user.social_accounts.x}` : "",
    photoBase64 ? `PHOTO;JPEG;ENCODING=BASE64:\r\n ${photoBase64}` : "",
    "END:VCARD",
  ];

  const vCard = vCardLines.filter(Boolean).join("\r\n");

  const blob = new Blob([vCard], { type: "text/x-vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${user.name || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}