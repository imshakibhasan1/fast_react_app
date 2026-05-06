// UserCard.jsx — displays one user's data

function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>@{user.username}</p>
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
      <p>🌐 {user.website}</p>
      <p>🏢 {user.company.name}</p>
      <p>📍 {user.address.city}</p>
    </div>
  )
}

export default UserCard
