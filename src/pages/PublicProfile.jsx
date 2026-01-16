import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import { fetchUserProfile } from "../services/profileApi";

export default function PublicProfile() {
  const { userId } = useParams();

  // State for fetched data and errors
  const [data, setData] = useState(null);       // null initially, safe for skeleton
  const [error, setError] = useState(null);     // null initially

  useEffect(() => {
    // Reset data & error when userId changes to show skeleton properly
    setData(null);
    setError(null);

    // Add small delay to make skeleton visible
    const timer = setTimeout(() => {
      fetchUserProfile(userId)
        .then((response) => {
          // Explicitly set data
          setData(response);
        })
        .catch((err) => {
          // Explicit error handling
          setError(err?.message || "Failed to fetch user");
        });
    }, 1500); // 1.5 seconds delay

    // Cleanup timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, [userId]);

  // Show error if fetch fails
  if (error) return <div>Error: {error}</div>;

  // Show skeleton if data is not loaded yet
  if (!data) return <HeaderProfile user={null} accountType={null} />;

  // Show actual profile when data is available
  return <HeaderProfile user={data.user} accountType={data.accountType} />;
}
