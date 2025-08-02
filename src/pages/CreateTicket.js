import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/createticket.css';

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const categories = ["General", "Technical Issue", "Billing", "Account", "Feedback"];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!loggedInUser) {
      navigate('/login'); // redirect if not logged in
    } else {
      setCurrentUser(loggedInUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];

    const newTicket = {
      id: Date.now(),
      ...formData,
      createdBy: currentUser.username,
      assignedTo: currentUser.role === 'admin' ? 'User1' : 'SupportAgent',
      status: 'Open'
    };

    localStorage.setItem('tickets', JSON.stringify([...existingTickets, newTicket]));

    setMessage({ text: 'Ticket created successfully!', type: 'success' });

    setFormData({ title: '', description: '', category: '' });

    setTimeout(() => {
      setLoading(false);
      navigate('/tickets'); // change route to your ticket list page
    }, 1000);
  };

  return (
    <div className="create-ticket-page">
      <div className="create-ticket-container">
        <h2>Create New Ticket</h2>

        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Briefly describe your issue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your issue..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Create Ticket'}
            </button>
            <button 
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
