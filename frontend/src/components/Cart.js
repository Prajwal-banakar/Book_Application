import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowRight, FaMinus, FaPlus, FaShoppingCart, FaBookOpen } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-card p-5 col-md-6 mx-auto my-4 shadow-lg">
          <div className="navbar-brand-icon mx-auto mb-3" style={{ width: '64px', height: '64px', borderRadius: '20px', fontSize: '1.8rem' }}>
            <FaShoppingCart />
          </div>
          <h3 className="fw-bold font-heading text-primary mb-2">Your Shopping Cart is Empty</h3>
          <p className="text-muted small mb-4">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/books" className="btn btn-modern-primary font-heading fw-bold px-4 py-2">
            <FaBookOpen className="me-2" /> Explore Book Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold font-heading text-primary m-0">Shopping Cart</h2>
          <p className="text-muted small m-0">{cart.items.length} item(s) in your bag</p>
        </div>
        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={clearCart}>
          Clear Entire Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Cart Item Listing */}
        <div className="col-lg-8">
          <div className="glass-container p-4 shadow-sm">
            {cart.items.map((item) => (
              <motion.div
                key={item.bookId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-3 mb-3 bg-white rounded-3 border shadow-xs gap-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3" style={{ width: '48px', height: '56px' }}>
                    <FaBookOpen size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-heading mb-1 text-dark">{item.title}</h6>
                    <small className="text-muted d-block">{item.author}</small>
                    <span className="fw-bold text-primary small">₹{item.price} each</span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 mt-2 mt-sm-0">
                  {/* Quantity Stepper */}
                  <div className="d-flex align-items-center gap-2 border rounded-pill p-1 bg-light">
                    <button
                      className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-xs"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="fw-bold px-2" style={{ minWidth: '24px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-xs"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  <span className="fw-bold font-heading fs-5 text-primary" style={{ minWidth: '80px', textAlign: 'right' }}>
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2"
                    onClick={() => removeFromCart(item.bookId)}
                    title="Remove Item"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="col-lg-4">
          <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
            <h4 className="fw-bold font-heading text-primary mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Subtotal</span>
              <span className="fw-bold text-dark">₹{cart.totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Shipping</span>
              <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2 py-1">FREE</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold font-heading fs-5 text-dark">Total</span>
              <span className="fw-extrabold font-heading fs-4 text-primary">₹{cart.totalPrice}</span>
            </div>

            <button
              className="btn btn-modern-primary w-100 py-3 font-heading fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;