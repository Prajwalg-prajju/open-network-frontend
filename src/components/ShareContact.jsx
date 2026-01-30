import React, { useState, useEffect } from "react";

export default function ShareContact({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment"); // default back camera

  // Capture photo
  const handleCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing }, // "user" or "environment"
      });

      const video = document.createElement("video");
      video.srcObject = mediaStream;
      video.play();

      await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(true);
      });

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      mediaStream.getTracks().forEach((track) => track.stop());

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setPhoto(blob);
            setPhotoPreview(URL.createObjectURL(blob));
          } else {
            setPhotoPreview(canvas.toDataURL("image/jpeg", 0.95));
          }
        },
        "image/jpeg",
        0.95
      );
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied or not supported on this device.");
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { sharedBy: userId, name, phone, email, note, photo };
    console.log("Sharing contact:", payload);

    setSubmitted(true);
    setIsOpen(false);
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
    setPhoto(null);
    setPhotoPreview(null);
  };

  // Auto-hide success message
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="share-contact-wrapper">
      <button className="share-contact-btn-main" onClick={() => setIsOpen(true)}>
        Share Your Contact
      </button>

      {isOpen && (
        <div className="share-contact-modal">
          <div className="share-contact-content">
            <h3>Share Your Contact</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Add a note (max 100 words)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={600}
              />

              {/* Camera facing toggle */}
              {!photoPreview && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <button
                    type="button"
                    className="camera-btn pulse"
                    onClick={() => setCameraFacing("user")}
                    style={{ flex: 1, marginRight: "4px" }}
                  >
                    🤳 Front Camera
                  </button>
                  <button
                    type="button"
                    className="camera-btn pulse"
                    onClick={() => setCameraFacing("environment")}
                    style={{ flex: 1, marginLeft: "4px" }}
                  >
                    📷 Back Camera
                  </button>
                </div>
              )}

              {/* Capture photo button */}
              {!photoPreview && (
                <button type="button" className="camera-btn pulse" onClick={handleCapture}>
                  📸 Capture Photo
                </button>
              )}

              {/* Preview */}
              {photoPreview && (
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <img
                    src={photoPreview}
                    alt="Captured"
                    style={{
                      width: "100%",
                      maxHeight: "160px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    className="camera-btn"
                    onClick={() => setPhotoPreview(null)}
                  >
                    🔄 Retake Photo
                  </button>
                </div>
              )}

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button type="button" className="cancel-btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitted && <div className="success-message">Contact shared successfully!</div>}
    </div>
  );
}
