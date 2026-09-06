import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaBookOpen, FaUserCircle, FaSignOutAlt, FaClipboardList, FaCog, FaShoppingCart, FaComments, FaHeart, FaSearch } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path ? 'active' : '';
  const isAdmin = user.role === 'ADMIN';
  const cartItemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-modern sticky-top">
      <div className="container">
        <Link className="navbar-brand-modern text-decoration-none" to="/">
          <span className="navbar-brand-icon">
            <FaBookOpen size={20} />
          </span>
          <span>Book<span className="text-gradient">Haven</span></span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ms-lg-4" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link className={`nav-link-modern ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link-modern ${isActive('/books')}`} to="/books">Browse Store</Link>
            </li>

            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link-modern ${isActive('/add')}`} to="/add">Add Book</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link-modern ${isActive('/admin')}`} to="/admin">
                    <FaCog className="me-1" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link-modern ${isActive('/admin/chat')}`} to="/admin/chat">
                    <FaComments className="me-1" /> Support Chat
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link-modern ${isActive('/orders')}`} to="/orders">
                    <FaClipboardList className="me-1" /> Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link-modern ${isActive('/wishlist')}`} to="/wishlist">
                    <FaHeart className="me-1" /> Wishlist
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className={`nav-link-modern ${isActive('/search')}`} to="/search">
                <FaSearch className="me-1" /> Search
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Notifications */}
            <NotificationDropdown />

            {/* Shopping Cart Pill */}
            {!isAdmin && (
              <Link to="/cart" className="position-relative text-decoration-none text-white me-2">
                <div className="p-2 rounded-circle bg-white bg-opacity-10 d-flex align-items-center justify-content-center transition-all hover-scale" style={{ width: '42px', height: '42px' }}>
                  <FaShoppingCart size={18} />
                </div>
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Profile Pill */}
            <Link to="/profile" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 px-3 py-15 rounded-pill border border-white border-opacity-10 hover-bg-opacity-20 transition-all" style={{ cursor: 'pointer' }}>
                <FaUserCircle size={22} className="text-white-50" />
                <span className="text-white fw-semibold small">{user.fullName || user.username}</span>
                {isAdmin && <span className="badge bg-warning text-dark fw-bold ms-1" style={{ fontSize: '0.65rem' }}>ADMIN</span>}
              </div>
            </Link>

            {/* Logout Button */}
            <button
              className="btn btn-outline-light btn-sm rounded-pill px-3 py-15 fw-bold d-flex align-items-center gap-2"
              onClick={handleLogout}
              style={{ fontSize: '0.85rem' }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;