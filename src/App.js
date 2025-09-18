import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// Stateless user profile component showing user info including nested address and company
function UserProfile({ user }) {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

  return (
    <div className="card mb-4 shadow-sm" style={{ minHeight: '180px' }}>
      <div className="d-flex flex-row align-items-center">
        <div className="p-4">
          <img 
            src={avatarUrl} 
            alt="User avatar" 
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }} 
          />
        </div>
        <div className="flex-grow-1 p-3">
          <h4>{user.name}</h4>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Phone:</strong> {user.phone}</div>
          <div><strong>Company:</strong> {user.company.name}</div>
          <div><strong>Website:</strong> {user.website}</div>
          <div><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div>
      <div className="spinner"></div>
    </div>
  );
}


  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User Profiles</h1>
      <div className="container mt-4">
  {users.map(user => (
    <UserProfile key={user.id} user={user} />
  ))}
</div>

    </div>
  );
}

export default App;
