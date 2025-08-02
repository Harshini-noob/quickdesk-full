import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/agentdashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    try {
      // Dummy Users
      const dummyUsers = [
        { _id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'user', isActive: true },
        { _id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'agent', isActive: true },
        { _id: 'u3', name: 'Charlie', email: 'charlie@example.com', role: 'admin', isActive: false }
      ];

      // Dummy Tickets
      const dummyTickets = [
        { _id: 't1', title: 'Login issue', description: 'Cannot log in', status: 'open', category: 'Login', createdAt: new Date() },
        { _id: 't2', title: 'Payment failed', description: 'Transaction didn’t go through', status: 'resolved', category: 'Billing', createdAt: new Date() }
      ];

      // Dummy Categories
      const dummyCategories = [
        { _id: 'c1', name: 'Login' },
        { _id: 'c2', name: 'Billing' }
      ];

      setUsers(dummyUsers);
      setTickets(dummyTickets);
      setCategories(dummyCategories);
    } catch (err) {
      setError('Failed to load dummy data');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const newCat = {
      _id: `c${Date.now()}`,
      name: newCategory.trim()
    };
    setCategories([...categories, newCat]);
    setNewCategory('');
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat._id !== categoryId));
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    categories: categories.length
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <span className="admin-name">
              {localStorage.getItem('user') || 'Admin'}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <svg viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
          <button className={`tab ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>Tickets</button>
          <button className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Categories</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-indicator">
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-section">
                <div className="stats-grid">
                  {Object.entries(stats).map(([key, value]) => (
                    <div className="stat-card" key={key}>
                      <h3>{key.replace(/([A-Z])/g, ' $1')}</h3>
                      <p className="stat-value">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-section">
                <h2>User Management</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <select value={user.role} onChange={e => handleUpdateUserRole(user._id, e.target.value)}>
                            <option value="user">User</option>
                            <option value="agent">Agent</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn view">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="tickets-section">
                <h2>All Tickets</h2>
                <div className="tickets-grid">
                  {tickets.map(ticket => (
                    <div key={ticket._id} className="ticket-card">
                      <div className="ticket-header">
                        <h3>{ticket.title}</h3>
                        <span className={`status-badge ${ticket.status}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="ticket-description">
                        {ticket.description.length > 100 
                          ? ticket.description.substring(0, 100) + '...' 
                          : ticket.description}
                      </p>
                      <div className="ticket-meta">
                        <span className="category">{ticket.category}</span>
                        <span className="date">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="categories-section">
                <h2>Category Management</h2>
                <form onSubmit={handleAddCategory} className="add-category-form">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    required
                  />
                  <button type="submit" className="add-btn">Add Category</button>
                </form>
                <div className="categories-list">
                  {categories.map(cat => (
                    <div key={cat._id} className="category-item">
                      <span>{cat.name}</span>
                      <button onClick={() => handleDeleteCategory(cat._id)} className="delete-btn">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
