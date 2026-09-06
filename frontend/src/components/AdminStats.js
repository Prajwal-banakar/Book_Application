import React from 'react';
import { FaBook, FaUsers, FaShoppingCart } from 'react-icons/fa';

const AdminStats = ({ stats }) => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-4">
        <div className="stat-card-modern">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-semibold text-uppercase tracking-wider">Total Books</span>
              <h2 className="fw-extrabold font-heading text-primary m-0 mt-1">{stats.totalBooks}</h2>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3">
              <FaBook size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="stat-card-modern" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-semibold text-uppercase tracking-wider">Registered Users</span>
              <h2 className="fw-extrabold font-heading text-success m-0 mt-1">{stats.totalUsers}</h2>
            </div>
            <div className="p-3 bg-success bg-opacity-10 text-success rounded-3">
              <FaUsers size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="stat-card-modern" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-semibold text-uppercase tracking-wider">Total Orders</span>
              <h2 className="fw-extrabold font-heading text-secondary m-0 mt-1">{stats.totalOrders}</h2>
            </div>
            <div className="p-3 bg-secondary bg-opacity-10 text-secondary rounded-3">
              <FaShoppingCart size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;