import { Link } from "react-router-dom";

export default function Home() {
  // Example list of users (you can fetch from API later)
  const users = [
    { id: "0b7ddbc8-ec37-4f93-9f45-058a79c3350c", name: "John Doe" },
    {id : "0b7ddbc8-ec37-4f93-9f45-058a79c3350c", name: "gothilla"}
  ];

  return (
    <div style={{  maxWidth: "600px", margin: "auto" }}>
      <h1>Open Network</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} >
            <Link to={`/u/${user.id}`}>View {user.name}'s Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
