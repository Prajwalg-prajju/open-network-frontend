// components/profiles/ShareContact.jsx
import React, { useState, useEffect, useRef } from "react";

export default function ShareContact({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch  {
      alert("Camera access denied");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraOn(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      setPhoto(blob);
      setPhotoPreview(URL.createObjectURL(blob));
    });

    stopCamera();
  };

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

  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      setSubmitted(false);
    }, 5000);

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

              {!cameraOn && !photoPreview && (
                <button
                  type="button"
                  className="camera-btn"
                  onClick={startCamera}
                >
                  📷 Open Camera
                </button>
              )}

              {cameraOn && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: "100%", borderRadius: "10px", marginBottom: "8px" }}
                  />
                  <button
                    type="button"
                    className="camera-btn"
                    onClick={capturePhoto}
                  >
                    📸 Capture
                  </button>
                </>
              )}

              {photoPreview && (
                <div style={{ marginBottom: "12px", textAlign: "center" }}>
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "160px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                </div>
              )}

              <canvas ref={canvasRef} hidden />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    stopCamera();
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="success-message">
          Contact shared successfully!
        </div>
      )}
    </div>
  );
}
