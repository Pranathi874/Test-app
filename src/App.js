import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile({ user, onDelete, onToggleLike, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  });

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSaveEdit(user.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsEditing(false);
  };

  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: 0, flexGrow: 1 }}>
      <div style={{ background: '#f5f5f5', textAlign: 'center', paddingTop: 20 }}>
        <img
          src={avatarUrl}
          alt="User avatar"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <div className="card-body border-bottom" style={{ minHeight: 140 }}>
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              value={editData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              className="form-control mb-2"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control"
              name="website"
              value={editData.website}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <h5 className="card-title">{user.name}</h5>
            <div className="card-text mb-1">
              <i className="bi bi-envelope"></i> <span style={{ marginLeft: 8 }}>{user.email}</span>
            </div>
            <div className="card-text mb-1">
              <i className="bi bi-telephone"></i> <span style={{ marginLeft: 8 }}>{user.phone}</span>
            </div>
            <div className="card-text">
              <i className="bi bi-globe"></i> <span style={{ marginLeft: 8 }}>http://{user.website}</span>
            </div>
          </>
        )}
      </div>
      <div className="d-flex justify-content-around p-2 border-top" style={{ background: '#fafafa' }}>
        <span
          role="button"
          onClick={() => onToggleLike(user.id)}
          style={{ cursor: 'pointer', color: user.liked ? 'crimson' : '#666' }}
          aria-label={user.liked ? 'Unlike' : 'Like'}
        >
          <i className={user.liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </span>
        {isEditing ? (
          <>
            <button className="btn btn-success btn-sm" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <span role="button" style={{ cursor: 'pointer', color: '#666' }} onClick={() => setIsEditing(true)} aria-label="Edit">
            <i className="bi bi-pencil"></i>
          </span>
        )}
        <span
          role="button"
          onClick={() => onDelete(user.id)}
          style={{ cursor: 'pointer', color: '#666' }}
          aria-label="Delete"
        >
          <i className="bi bi-trash"></i>
        </span>
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        // Add like state
        const usersWithLike = data.map(user => ({ ...user, liked: false }));
        setUsers(usersWithLike);
        setLoading(false);
      });
  }, []);

  const handleDelete = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleLike = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, liked: !user.liked } : user
      )
    );
  };

  const handleSaveEdit = (id, editData) => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, ...editData } : user
      )
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {users.map(user => (
          <div key={user.id} className="col-md-4 d-flex">
            <UserProfile
              user={user}
              onDelete={handleDelete}
              onToggleLike={handleToggleLike}
              onSaveEdit={handleSaveEdit}
            />
          </div>
        ))}
      </div>
      {/* Bootstrap Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />
    </div>
  );
}

export default App;
