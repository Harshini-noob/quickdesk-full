import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "user") navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="user-dashboard-wrapper">
      <nav className="user-dashboard-nav">
        <div className="nav-left">
          <h2 className="logo">QuickDesk</h2>
          <span className="tagline">User Support Panel</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <header className="user-dashboard-header">
        <h1>Welcome Back</h1>
        <p>Manage your support tickets with ease</p>
      </header>

      <main className="user-dashboard-grid">
        <div
          className="dashboard-card"
          onClick={() => navigate("/create")}
        >
          <div className="card-icon blue"><span>+</span></div>
          <h3>Create Ticket</h3>
          <p>Submit a new support request</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/tickets")}
        >
          <div className="card-icon green"><span>📋</span></div>
          <h3>View Tickets</h3>
          <p>See your open, pending and resolved tickets</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon purple"><span>📊</span></div>
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            <div><strong>2</strong><span>Open</span></div>
            <div><strong>1</strong><span>Pending</span></div>
            <div><strong>5</strong><span>Resolved</span></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
