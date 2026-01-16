import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import { fetchUserProfile } from "../services/profileApi";

export default function PublicProfile() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile(userId)
      .then(setData)
      .catch(err => setError(err.message));
  }, [userId]);

  if (error) return <div>Error: {error}</div>;

  // 👉 Show skeleton instead of text
  if (!data) {
    return <HeaderProfile user={null} accountType={null} />;
  }

  return (
    <HeaderProfile
      user={data.user}
      accountType={data.accountType}
    />
  );
}
