import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AdminStats from './AdminStats';
import AdminBookManagement from './AdminBookManagement';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalBooks: 0, totalUsers: 0, totalOrders: 0 });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [booksRes, usersRes, ordersRes] = await Promise.all([
        axios.get('/api/books'),
        axios.get('/api/users'),
        axios.get('/api/orders/all')
      ]);
      setStats({
        totalBooks: booksRes.data.length,
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
      fetchOrders();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="badge-pill-modern badge-approved">APPROVED</span>;
      case 'PENDING':
        return <span className="badge-pill-modern badge-pending">PENDING</span>;
      case 'DELIVERED':
        return <span className="badge-pill-modern badge-delivered">DELIVERED</span>;
      default:
        return <span className="badge-pill-modern badge-cancelled">{status}</span>;
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold font-heading text-primary m-0">Admin Overview & Control Center</h2>
          <p className="text-muted small m-0">Manage catalog inventory, monitor stats, and process user orders</p>
        </div>
        <Link to="/admin/messages" className="btn btn-modern-outline btn-sm d-flex align-items-center gap-2">
          <FaEnvelope /> View Inquiries
        </Link>
      </div>

      <AdminStats stats={stats} />

      {/* Orders Table */}
      <div className="glass-container p-4 mb-5 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold font-heading text-primary m-0">Recent Customer Orders</h5>
          <span className="badge bg-light text-secondary border px-3 py-1">
            Showing top {Math.min(5, orders.length)} orders
          </span>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Customer</th>
                <th>Total Value</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="fw-bold text-dark font-monospace">#{order.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <span className="fw-semibold text-secondary">{order.username}</span>
                  </td>
                  <td>
                    <span className="fw-extrabold font-heading text-primary">₹{order.totalPrice || order.price}</span>
                  </td>
                  <td className="small text-muted">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 rounded-start-pill"
                        onClick={() => updateStatus(order.id, 'APPROVED')}
                        disabled={order.status !== 'PENDING'}
                      >
                        <FaCheckCircle size={12} /> Approve
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 rounded-end-pill"
                        onClick={() => updateStatus(order.id, 'CANCELLED')}
                        disabled={order.status === 'CANCELLED' || order.status === 'DELIVERED'}
                      >
                        <FaTimesCircle size={12} /> Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-muted py-4 m-0">No customer orders recorded yet.</p>
          )}
        </div>
      </div>

      <AdminBookManagement />
    </div>
  );
};

export default AdminDashboard;