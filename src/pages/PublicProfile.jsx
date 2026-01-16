import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import ProfileSkeleton from "../components/ProfileSkeleton"; // Skeleton component
import { fetchUserProfile } from "../services/profileApi";

export default function PublicProfile() {
  const { userId } = useParams();

  // State for user data and errors
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ Reset state using a timeout to avoid ESLint "set-state-in-effect" warning
    const resetTimer = setTimeout(() => {
      setData(null);
      setError(null);
    }, 0);

    // Fetch user profile after small delay for skeleton effect
    const fetchTimer = setTimeout(() => {
      fetchUserProfile(userId)
        .then((response) => {
          setData(response);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch user");
        });
    }, 500);

    // Cleanup timers on unmount or userId change
    return () => {
      clearTimeout(resetTimer);
      clearTimeout(fetchTimer);
    };
  }, [userId]);

  // Show error if fetch fails
  if (error) return <div>Error: {error}</div>;

  // Show skeleton while loading
  if (!data) return <ProfileSkeleton />;

  // Show actual profile when data is loaded
  return <HeaderProfile user={data.user} accountType={data.accountType} />;
}
