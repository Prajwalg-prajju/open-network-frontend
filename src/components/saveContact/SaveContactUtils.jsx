async function imageUrlToBase64(url) {
  if (!url) return "";

  try {
    const res = await fetch(url, { mode: "cors" }); // will fail if no CORS
    const blob = await res.blob();

    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64.match(/.{1,74}/g).join("\r\n "));
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    console.warn("Cannot fetch remote image, use file input instead");
    return "";
  }
}

export async function saveContact(user, fileInput = null) {
  let photoBase64 = "";

  if (fileInput?.files?.[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    photoBase64 = await new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1].match(/.{1,74}/g).join("\r\n "));
      };
      reader.readAsDataURL(file);
    });
  } else if (user.profile_image) {
    photoBase64 = await imageUrlToBase64(user.profile_image);
  }

  const profileLink = `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.user_id}`;

  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${user.name || ""};;;`,
    `FN:${user.name || ""}`,
    user.phone_number ? `TEL;CELL:${user.phone_number}` : "",
    user.emergency_number ? `TEL;VOICE:${user.emergency_number}` : "",
    user.email ? `EMAIL:${user.email}` : "",
    user.address ? `ADR:;;${user.address};;;;` : "",
    `URL:${profileLink}`,
    user.social_accounts?.instagram ? `URL:${user.social_accounts.instagram}` : "",
    user.social_accounts?.linkedin ? `URL:${user.social_accounts.linkedin}` : "",
    user.social_accounts?.x ? `URL:${user.social_accounts.x}` : "",
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
