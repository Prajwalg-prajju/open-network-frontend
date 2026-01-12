export function saveContact(user) {

  const profileLink =
    `https://prajwalg-prajju.github.io/open-network-frontend/#/u/${user.user_id}`;

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
  .join("\n")}
`.trim().replace(/\n/g, "\\n");

  const vCard =
`BEGIN:VCARD
VERSION:2.1
N:${user.name || ""};;;
FN:${user.name || ""}
TEL;CELL:${user.phone_number || ""}
TEL;VOICE:${user.emergency_number || ""}
EMAIL:${user.email || ""}
ADR:;;${user.address || ""};;;;
URL:${profileLink}
NOTE:${notes}
END:VCARD`;

  const blob = new Blob([vCard], {
    type: "text/x-vcard;charset=utf-8"
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
