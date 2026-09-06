import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaLock, FaArrowRight, FaCreditCard, FaTruck } from 'react-icons/fa';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1800));

      await axios.post('/api/orders/checkout', {
        paymentMethod: 'Credit Card',
        shippingAddress: `${address.street}, ${address.city}, ${address.state} ${address.zip}`
      });

      await fetchCart();
      navigate('/orders');
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data || error.message));
    } finally {
      setProcessing(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-card p-5 col-md-6 mx-auto my-4 shadow-lg">
          <h3 className="fw-bold font-heading text-primary">Your cart is empty</h3>
          <p className="text-muted small">Please add items to your cart before proceeding to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="col-lg-10 mx-auto">
        {/* Stepper Header */}
        <div className="glass-container p-4 mb-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <h4 className="fw-bold font-heading text-primary m-0 d-flex align-items-center gap-2">
              <FaLock size={20} /> Checkout Process
            </h4>

            <div className="d-flex align-items-center gap-4">
              <div className={`d-flex align-items-center gap-2 ${step >= 1 ? 'text-primary fw-bold' : 'text-muted'}`}>
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 28, height: 28 }}>
                  1
                </div>
                <span><FaTruck className="me-1" /> Shipping</span>
              </div>
              <span className="text-muted opacity-50">→</span>
              <div className={`d-flex align-items-center gap-2 ${step >= 2 ? 'text-primary fw-bold' : 'text-muted'}`}>
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 28, height: 28 }}>
                  2
                </div>
                <span><FaCreditCard className="me-1" /> Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Main Checkout Form */}
          <div className="col-md-7">
            <div className="glass-container p-4 p-md-5 shadow-sm">
              {step === 1 ? (
                <form onSubmit={handleNextStep}>
                  <h5 className="fw-bold font-heading text-primary mb-3">1. Shipping Address</h5>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Street Address</label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                      placeholder="House/Apartment #, Street name"
                    />
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-5">
                      <label className="form-label small fw-bold text-secondary">City</label>
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                        placeholder="New York"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-secondary">State</label>
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-secondary">Zip Code</label>
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        name="zip"
                        value={address.zip}
                        onChange={handleAddressChange}
                        required
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <button className="btn btn-modern-primary w-100 py-3 font-heading fw-bold d-flex align-items-center justify-content-center gap-2" type="submit">
                    Continue to Payment <FaArrowRight />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h5 className="fw-bold font-heading text-primary mb-3">2. Mock Payment Details</h5>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      name="name"
                      value={payment.name}
                      onChange={handlePaymentChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Card Number</label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      name="cardNumber"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      required
                      placeholder="4532 0000 0000 0000"
                    />
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">Expiration</label>
                      <input
                        type="text"
                        className="form-control form-control-modern"
                        name="expiry"
                        value={payment.expiry}
                        onChange={handlePaymentChange}
                        required
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">CVV</label>
                      <input
                        type="password"
                        className="form-control form-control-modern"
                        name="cvv"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        required
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-outline-secondary w-50 rounded-pill font-heading fw-bold" type="button" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button className="btn btn-success w-50 rounded-pill py-3 font-heading fw-bold shadow-sm" type="submit" disabled={processing}>
                      {processing ? 'Processing...' : `Pay ₹${cart.totalPrice}`}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Cart Summary Sidebox */}
          <div className="col-md-5">
            <div className="glass-card p-4">
              <h5 className="fw-bold font-heading text-primary mb-3">Order Summary</h5>
              <div className="mb-3 max-vh-40 overflow-auto pr-1">
                {cart.items.map((item) => (
                  <div key={item.bookId} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <div>
                      <h6 className="fw-bold small m-0 text-dark">{item.title}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <span className="fw-bold text-primary small">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Shipping</span>
                <span className="badge bg-success bg-opacity-10 text-success">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold font-heading text-dark">Total</span>
                <span className="fw-extrabold font-heading text-primary fs-4">₹{cart.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;