import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    try {
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);
      params.append('fullName', formData.fullName);
      params.append('email', formData.email);
      params.append('phoneNumber', formData.phoneNumber);
      params.append('address', formData.address);

      await axios.post('/register', params);
      setStatus({ type: 'success', msg: 'Registration Successful! Redirecting to login...' });

      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Registration failed. Username might already be taken.' });
    }
  };

  const isAdminCandidate = formData.username.toLowerCase().includes('admin');

  return (
    <div className="d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.15) 0%, rgba(248, 250, 252, 1) 70%)' }}>
      <motion.div
        className="col-11 col-sm-10 col-md-8 col-lg-6"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="glass-container p-4 p-md-5 shadow-lg border-0">
          <div className="text-center mb-4">
            <div className="navbar-brand-icon mx-auto mb-3" style={{ width: '56px', height: '56px', borderRadius: '16px', fontSize: '1.5rem' }}>
              <FaBookOpen />
            </div>
            <h2 className="fw-bold font-heading mb-1 text-primary">Join BookHaven</h2>
            <p className="text-muted small">Create an account to browse, purchase, and review books</p>
          </div>

          {isAdminCandidate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge bg-warning text-dark w-100 p-2 mb-3 d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm"
            >
              <FaShieldAlt /> Admin Role Detected (Username contains 'admin')
            </motion.div>
          )}

          {status.msg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`alert ${status.type === 'success' ? 'alert-success border-success' : 'alert-danger border-danger'} text-center py-2 px-3 small rounded-3 mb-4`}
              role="alert"
            >
              {status.msg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">Username</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted px-3">
                    <FaUser size={14} />
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-modern rounded-start-0"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted px-3">
                    <FaLock size={14} />
                  </span>
                  <input
                    type="password"
                    className="form-control form-control-modern rounded-start-0"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-secondary">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-modern"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted px-3">
                    <FaEnvelope size={14} />
                  </span>
                  <input
                    type="email"
                    className="form-control form-control-modern rounded-start-0"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted px-3">
                    <FaPhone size={14} />
                  </span>
                  <input
                    type="tel"
                    className="form-control form-control-modern rounded-start-0"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="col-12 mb-2">
                <label className="form-label small fw-bold text-secondary">Shipping Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted px-3 align-items-start pt-2">
                    <FaMapMarkerAlt size={14} />
                  </span>
                  <textarea
                    className="form-control form-control-modern rounded-start-0"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street, City, Zip Code..."
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-modern-primary w-100 py-25 font-heading fw-bold mt-4"
              disabled={status.type === 'success'}
            >
              {status.type === 'success' ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted small mb-0">
              Already registered?{' '}
              <Link to="/login" className="text-primary fw-bold text-decoration-none hover-underline">
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;