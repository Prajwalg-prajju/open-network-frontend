// components/UPIPaymentButton.jsx
import React from "react";

export default function UPIPaymentButton({ upiId }) {
  // If no UPI ID → show NOTHING
  if (!upiId) return null;

  const payWithUPI = () => {
    const amount = 1; // optional (can be dynamic later)
    const name = "UPI Payment";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
  };

  return (
    <div className="info-card upi-card">
      <button className="upi-pay-btn" onClick={payWithUPI}>
        Pay with UPI
      </button>
    </div>
  );
}
