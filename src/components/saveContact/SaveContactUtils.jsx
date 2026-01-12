async function imageToBase64(url) {
  if (!url) return "";

  try {
    const res = await fetch(url);
    const blob = await res.blob();

    if (blob.size > 300000) return "";

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

export async function saveContact(user) {
  const photo = await imageToBase64(user.profile_image);

  const profileLink =
    `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.id}`;

  const notes = `
Open Profile: ${profileLink}

Bio: ${user.bio || ""}
Status: ${user.status_type || ""}
Emergency: ${user.emergency_number || ""}
Gender: ${user.gender || ""}
DOB: ${user.birth_year || ""}
Languages: ${(user.selected_languages || []).join(", ")}

Social:
Instagram: ${user.social_accounts?.instagram || ""}
LinkedIn: ${user.social_accounts?.linkedin || ""}
Twitter: ${user.social_accounts?.x || ""}

Custom Links:
${(user.custom_links || [])
  .map(l => `${l.label}: ${l.url}`)
  .join("\\n")}
`.trim();

  const vCard = `
BEGIN:VCARD
VERSION:2.1
N:${user.name || ""};;;
FN:${user.name || ""}
TEL;CELL:${user.phone_number || ""}
TEL;TYPE=EMERGENCY:${user.emergency_number || ""}
EMAIL:${user.email || ""}
ADR:;;${user.address || ""};;;
URL:${profileLink}
NOTE:${notes.replace(/\n/g, "\\n")}
${photo ? `PHOTO;JPEG;ENCODING=BASE64:${photo}` : ""}
END:VCARD
`.trim();

  const blob = new Blob([vCard], {
    type: "text/vcard;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${user.name || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
