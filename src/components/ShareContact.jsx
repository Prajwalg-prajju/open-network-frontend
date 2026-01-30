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

  // Start camera
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera not supported on this browser.");
        return;
      }

      // Stop previous stream
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true); // iOS
        videoRef.current.muted = true; // required for autoplay
        await videoRef.current.play();
      }

      setCameraOn(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera permission in your browser settings.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Make canvas same size as video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setPhoto(blob);
      setPhotoPreview(URL.createObjectURL(blob));
    }, "image/jpeg", 0.95);

    stopCamera(); // stop camera after capture
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

  // Auto-hide success
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="share-contact-wrapper">
      <button
        className="share-contact-btn-main"
        onClick={() => setIsOpen(true)}
      >
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

              {/* Camera button */}
              {!cameraOn && !photoPreview && (
                <button
                  type="button"
                  className="camera-btn pulse"
                  onClick={startCamera}
                >
                  📷 Open Camera
                </button>
              )}

              {/* Live camera */}
              {cameraOn && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "8px",
                    }}
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

              {/* Photo preview */}
              {photoPreview && (
                <div
                  style={{
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "160px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}

              {/* Hidden canvas */}
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
        <div className="success-message">Contact shared successfully!</div>
      )}
    </div>
  );
}
