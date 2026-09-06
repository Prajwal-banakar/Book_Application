import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaTrash, FaBookOpen, FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlistBooks();
  }, []);

  const fetchWishlistBooks = async () => {
    try {
      const wishlistRes = await axios.get('/api/wishlist');
      const bookIds = wishlistRes.data.bookIds || [];

      if (bookIds.length > 0) {
        const bookRequests = bookIds.map((id) => axios.get(`/api/books/${id}`));
        const bookResponses = await Promise.all(bookRequests);
        setBooks(bookResponses.map((res) => res.data));
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Failed to fetch wishlist books');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`/api/wishlist/${bookId}`);
      setBooks(books.filter((book) => book.bookid !== bookId));
    } catch (err) {
      setError('Failed to remove book from wishlist');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold font-heading text-primary m-0 d-flex align-items-center gap-2">
            <FaHeart className="text-danger" /> My Saved Wishlist
          </h2>
          <p className="text-muted small m-0">Saved books you want to read or buy later</p>
        </div>
      </div>

      {error && <div className="alert alert-danger rounded-3">{error}</div>}

      {books.length > 0 ? (
        <div className="row g-4">
          {books.map((book) => (
            <motion.div
              key={book.bookid}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-12"
            >
              <div className="glass-card p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3" style={{ width: '56px', height: '68px' }}>
                    <FaBookOpen size={28} />
                  </div>
                  <div>
                    <h5 className="fw-bold font-heading mb-1">
                      <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark hover-text-primary">
                        {book.title}
                      </Link>
                    </h5>
                    <p className="text-muted small mb-1">By {book.author}</p>
                    <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: '0.75rem' }}>
                      {book.genre || 'General Literature'}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 ms-auto">
                  <span className="fw-extrabold font-heading fs-4 text-primary">₹{book.price}</span>

                  <button
                    className="btn btn-sm btn-modern-primary font-heading fw-bold px-3 py-2"
                    onClick={() => addToCart(book.bookid)}
                    disabled={book.quantity <= 0}
                  >
                    <FaCartPlus className="me-1" /> Add to Cart
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2"
                    onClick={() => handleRemove(book.bookid)}
                    title="Remove from Wishlist"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-5 text-center col-md-6 mx-auto my-4 shadow-lg">
          <FaHeart size={54} className="text-danger opacity-50 mb-3" />
          <h3 className="fw-bold font-heading text-primary mb-2">Your Wishlist is Empty</h3>
          <p className="text-muted small mb-4">Explore our catalog and click the heart icon on any book to save it here.</p>
          <Link to="/books" className="btn btn-modern-primary font-heading fw-bold px-4 py-2">
            Browse Store
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;