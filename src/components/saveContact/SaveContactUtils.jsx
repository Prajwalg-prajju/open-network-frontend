async function resizeImage(url, maxWidth = 300, maxHeight = 300, quality = 0.7) {
  if (!url) return "";

  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous"; // Needed for cross-origin images
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });

    const canvas = document.createElement("canvas");
    let { width, height } = img;

    // Maintain aspect ratio
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    const base64 = dataUrl.split(",")[1];

    // Fold lines for vCard
    return base64.match(/.{1,74}/g).join("\r\n ");
  } catch (err) {
    console.warn("Image resize failed", err);
    return "";
  }
}

export async function saveContact(user) {
  const profileLink =
    `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.user_id}`;

  // Resize/compress profile image before adding to vCard
  const photoBase64 = await resizeImage(user.profile_image);

  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${user.name || ""};;;`,
    `FN:${user.name || ""}`,
    user.phone_number ? `TEL;CELL:${user.phone_number}` : "",
    user.emergency_number ? `TEL;VOICE:${user.emergency_number}` : "",
    user.email ? `EMAIL:${user.email}` : "",
    user.address ? `ADR:;;${user.address};;;;` : "",
    `URL:${profileLink}`, // profile link
    // social links as separate URLs
    user.social_accounts?.instagram ? `URL:${user.social_accounts.instagram}` : "",
    user.social_accounts?.linkedin ? `URL:${user.social_accounts.linkedin}` : "",
    user.social_accounts?.x ? `URL:${user.social_accounts.x}` : "",
    // Profile image
    photoBase64 ? `PHOTO;JPEG;ENCODING=BASE64:\r\n ${photoBase64}` : "",
    "END:VCARD"
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
