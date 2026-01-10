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

  useEffect(() => {
    if (data) {
      console.log("🧠 Stored data:", data);
    }
  }, [data]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
  <HeaderProfile
    user={data.user}
    accountType={data.accountType}
  />
);

}
