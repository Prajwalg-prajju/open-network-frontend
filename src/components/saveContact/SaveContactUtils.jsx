// Convert image URL to Base64 (for vCard PHOTO)
async function imageToBase64(imageUrl) {
  if (!imageUrl) return "";

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  } catch  {
    console.warn("Image conversion failed");
    return "";
  }
}

// ✅ UNIVERSAL SAVE CONTACT (ANDROID + IOS)
export async function saveContact(contact) {
  try {
    const photoBase64 = await imageToBase64(contact.profile_image);

    const vCard = `
BEGIN:VCARD
VERSION:3.0
N:${contact.name || ""};;;
FN:${contact.name || ""}
TEL;TYPE=CELL:${contact.phone_number || ""}
EMAIL:${contact.email || ""}
ADR;TYPE=HOME:;;${contact.address || ""};;;
URL:${contact.website || ""}
${photoBase64 ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : ""}
${contact.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}` : ""}
${contact.facebook ? `X-SOCIALPROFILE;TYPE=facebook:${contact.facebook}` : ""}
${contact.instagram ? `X-SOCIALPROFILE;TYPE=instagram:${contact.instagram}` : ""}
${contact.twitter ? `X-SOCIALPROFILE;TYPE=twitter:${contact.twitter}` : ""}
END:VCARD
    `.trim();

    const blob = new Blob([vCard], {
      type: "text/x-vcard;charset=utf-8;", // ✅ Android & iOS safe
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${contact.name || "contact"}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 2000);

  } catch (error) {
    console.error("Save contact failed", error);
    alert("Unable to save contact");
  }
}
