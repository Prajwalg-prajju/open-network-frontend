async function imageToBase64(url) {
  if (!url) return "";

  try {
    const res = await fetch(url);
    const blob = await res.blob();

    // Keep small for Android compatibility
    if (blob.size > 120000) return "";

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        const folded = base64.match(/.{1,74}/g).join("\r\n ");
        resolve(folded);
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

export async function saveContact(user) {
  const profileLink =
    `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.user_id}`;

  const photoBase64 = await imageToBase64(user.profile_image);

  // Build vCard with only supported fields
  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${user.name || ""};;;`,
    `FN:${user.name || ""}`,
    user.phone_number ? `TEL;CELL:${user.phone_number}` : "",
    user.emergency_number ? `TEL;VOICE:${user.emergency_number}` : "",
    user.email ? `EMAIL:${user.email}` : "",
    user.address ? `ADR:;;${user.address};;;;` : "",
    `URL:${profileLink}`, // profile link is always saved
    // Save social links as separate URLs if provided
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
