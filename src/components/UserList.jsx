// UserList.jsx — fetches users from the API and renders a UserCard for each one

import { useState, useEffect } from 'react'
import UserCard from './UserCard'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="grid">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
