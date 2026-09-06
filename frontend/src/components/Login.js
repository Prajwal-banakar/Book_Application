import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUser, FaLock, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });
    try {
      await login(username, password);
      setStatus({ type: 'success', msg: 'Welcome back! Redirecting...' });
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Invalid username or password. Please try again.' });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(248, 250, 252, 1) 70%)' }}>
      <motion.div
        className="col-11 col-sm-9 col-md-6 col-lg-4"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="glass-container p-4 p-md-5 shadow-lg border-0">
          <div className="text-center mb-4">
            <div className="navbar-brand-icon mx-auto mb-3" style={{ width: '56px', height: '56px', borderRadius: '16px', fontSize: '1.5rem' }}>
              <FaBookOpen />
            </div>
            <h2 className="fw-bold font-heading mb-1 text-primary">Welcome Back</h2>
            <p className="text-muted small">Sign in to manage your library and purchases</p>
          </div>

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
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted rounded-start-md px-3">
                  <FaUser size={14} />
                </span>
                <input
                  type="text"
                  className="form-control form-control-modern rounded-start-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted rounded-start-md px-3">
                  <FaLock size={14} />
                </span>
                <input
                  type="password"
                  className="form-control form-control-modern rounded-start-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-modern-primary w-100 py-25 font-heading fw-bold"
              disabled={status.type === 'success'}
            >
              {status.type === 'success' ? 'Signing in...' : (
                <>
                  Sign In <FaArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted small mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary fw-bold text-decoration-none hover-underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;