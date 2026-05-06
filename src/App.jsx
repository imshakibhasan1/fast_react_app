import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}


function UserCard({ user, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="card" style={{ '--accent': color }}>
      <div className="card-top">
        <div className="avatar" style={{ background: color }}>
          {getInitials(user.name)}
        </div>
        <div className="card-header-text">
          <h3>{user.name}</h3>
          <span className="username">@{user.username}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="icon">✉️</span>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
        <div className="info-row">
          <span className="icon">📞</span>
          <span>{user.phone}</span>
        </div>
        <div className="info-row">
          <span className="icon">🌐</span>
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
            {user.website}
          </a>
        </div>
        <div className="info-row">
          <span className="icon">📍</span>
          <span>{user.address.city}, {user.address.zipcode}</span>
        </div>
        <div className="divider" />
        <div className="company-row">
          <span className="icon">🏢</span>
          <div>
            <div className="company-name">{user.company.name}</div>
            <div className="company-catch">"{user.company.catchPhrase}"</div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <span className="badge" style={{ background: color }}>
          {user.company.bs.split(' ')[0]}
        </span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="card skeleton">
      <div className="card-top">
        <div className="skel skel-avatar" />
        <div style={{ flex: 1 }}>
          <div className="skel skel-line w-70" />
          <div className="skel skel-line w-40" />
        </div>
      </div>
      <div className="card-body">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skel skel-line" style={{ marginBottom: 12 }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.company.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />


      <main className="main">
        {error && (
          <div className="error-box">
            <span>⚠️</span>
            <div>
              <strong>Oops! Something went wrong</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>No users found</h2>
            <p>Try a different search term</p>

          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid">
            {filtered.map((user, i) => (
              <UserCard key={user.id} user={user} index={i} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          Data provided by{' '}
          <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer">
            JSONPlaceholder
          </a>{' '}
          · Built with React + Vite
        </p>
      </footer>
    </div>
  );
}
