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
  } catch {
    console.warn("Image conversion failed");
    return "";
  }
}

// ✅ ANDROID + IOS CONTACT PREVIEW
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
${photoBase64 ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : ""}
END:VCARD
`.trim();

    const blob = new Blob([vCard], {
      type: "text/x-vcard;charset=utf-8" // 🔥 IMPORTANT
    });

    const url = URL.createObjectURL(blob);

    // 🔥 MUST be an anchor click (Android intent)
    const a = document.createElement("a");
    a.href = url;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 3000);

  } catch (error) {
    console.error("Save contact failed", error);
    alert("Unable to save contact");
  }
}
