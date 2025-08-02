// src/pages/Tickets.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tickets.css';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: '',
    sort: 'recent',
    myTicketsOnly: true
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const currentUserId = currentUser?.username || 'guest';

  useEffect(() => {
    setLoading(true);

    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];

    let filtered = [...savedTickets];

    if (filters.myTicketsOnly) {
      filtered = filtered.filter(ticket => ticket.createdBy === currentUserId);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket =>
        filters.status === 'open' ? ticket.status !== 'Resolved' : ticket.status === 'Resolved'
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(ticket =>
        ticket.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.search) {
      const term = filters.search.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      if (filters.sort === 'recent') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (filters.sort === 'replies') {
        return (b.replies?.length || 0) - (a.replies?.length || 0);
      }
      return 0;
    });

    setTimeout(() => {
      setTickets(filtered);
      setLoading(false);
    }, 500);
  }, [filters, currentUserId]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      search: '',
      sort: 'recent',
      myTicketsOnly: true
    });
  };

  const getStatusBadge = (status) => {
    return status === 'Resolved' ? (
      <span className="badge resolved">Resolved</span>
    ) : (
      <span className="badge open">Open</span>
    );
  };

  const getCategoryBadge = (category) => {
    return <span className="category-badge">{category}</span>;
  };

  return (
    <div className="tickets-page">
      <div className="tickets-container">
        <div className="tickets-header">
          <h2>Your Support Tickets</h2>
          <button 
            className="create-ticket-btn"
            onClick={() => navigate('/create')}
          >
            + New Ticket
          </button>
        </div>

        <div className="filters-section">
          <div className="search-filter">
            <input
              type="text"
              name="search"
              placeholder="Search tickets..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="all">All Categories</option>
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Account">Account</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="recent">Recently Updated</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>

          <div className="filter-group checkbox-group">
            <input
              type="checkbox"
              id="myTicketsOnly"
              name="myTicketsOnly"
              checked={filters.myTicketsOnly}
              onChange={handleFilterChange}
            />
            <label htmlFor="myTicketsOnly">My Tickets Only</label>
          </div>

          <button className="reset-filters-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="no-tickets">
            <p>No tickets found matching your criteria</p>
          </div>
        ) : (
          <div className="tickets-list">
            {tickets.map(ticket => (
              <div 
                key={ticket.id}
                className="ticket-card"
                onClick={() => navigate(`/tickets/${ticket.id}`)}
              >
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <div className="ticket-meta">
                    {getStatusBadge(ticket.status)}
                    {getCategoryBadge(ticket.category)}
                  </div>
                </div>
                <p className="ticket-description">
                  {ticket.description.length > 150 
                    ? `${ticket.description.substring(0, 150)}...` 
                    : ticket.description}
                </p>
                <div className="ticket-footer">
                  <span className="ticket-date">
                    Last updated: {new Date(ticket.updatedAt || Date.now()).toLocaleString()}
                  </span>
                  <span className="ticket-replies">
                    {ticket.replies?.length || 0} replies
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
