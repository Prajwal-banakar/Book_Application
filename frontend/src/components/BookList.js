import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaEdit, FaTrash, FaCartPlus, FaCheckCircle, FaStar, FaHeart, FaBookOpen } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const isAdmin = user?.role === 'ADMIN';
  const [showToast, setShowToast] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    if (!isAdmin) {
      fetchWishlist();
    }
  }, [isAdmin]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      setWishlist(response.data.bookIds || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(b => b.genre && b.genre.toLowerCase() === genre.toLowerCase()));
    }
  };

  const handleAddToCart = async (bookId) => {
    const success = await addToCart(bookId);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    try {
      if (wishlist.includes(bookId)) {
        await axios.delete(`/api/wishlist/${bookId}`);
        setWishlist(wishlist.filter(id => id !== bookId));
      } else {
        await axios.post(`/api/wishlist/${bookId}`);
        setWishlist([...wishlist, bookId]);
      }
    } catch (error) {
      console.error('Failed to update wishlist', error);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      alert('Failed to delete book');
    }
  };

  const genres = ['All', 'Fiction', 'Science', 'Fantasy', 'History', 'Mystery', 'Romance'];

  return (
    <div className="container py-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 25, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="position-fixed top-0 start-50 rounded-pill shadow-lg py-3 px-4 d-flex align-items-center gap-2 text-white fw-bold"
            style={{ zIndex: 9999, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <FaCheckCircle size={20} /> Added to your shopping cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2 className="fw-bold font-heading text-primary m-0">Explore Book Catalog</h2>
          <p className="text-muted small m-0">Browse through our complete collection of literary works</p>
        </div>

        {/* Category Pills */}
        <div className="d-flex gap-2 flex-wrap">
          {genres.map(genre => (
            <button
              key={genre}
              className={`btn btn-sm rounded-pill px-3 py-15 font-heading fw-bold transition-all ${
                selectedGenre === genre
                  ? 'btn-primary shadow-sm'
                  : 'btn-light border text-secondary'
              }`}
              onClick={() => handleGenreFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Books */}
      <div className="row g-4">
        {filteredBooks.map((book) => (
          <motion.div
            key={book.bookid}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="book-card-modern h-100">
              {/* Cover */}
              <div className="book-cover-container">
                {book.coverImageUrl ? (
                  <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="book-cover-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="book-cover-placeholder position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    display: book.coverImageUrl ? 'none' : 'flex'
                  }}
                >
                  <FaBookOpen size={40} className="mb-2 opacity-75" />
                  <span className="fw-bold small line-clamp-2">{book.title}</span>
                </div>

                <div className="book-badge-rating">
                  <FaStar /> {book.averageRating ? book.averageRating.toFixed(1) : '4.5'}
                </div>

                {!isAdmin && (
                  <button
                    className={`wishlist-toggle-btn ${wishlist.includes(book.bookid) ? 'active' : ''}`}
                    onClick={() => handleAddToWishlist(book.bookid)}
                    title={wishlist.includes(book.bookid) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <FaHeart size={16} />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="book-card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {book.genre || 'General'}
                  </span>
                  <span className={`badge ${book.quantity > 0 ? 'badge-approved' : 'badge-cancelled'}`}>
                    {book.quantity > 0 ? `${book.quantity} in stock` : 'Out of Stock'}
                  </span>
                </div>

                <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
                  <h6 className="book-title mb-1">{book.title}</h6>
                </Link>
                <p className="book-author mb-3">{book.author}</p>

                <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                  <span className="book-price-tag">₹{book.price}</span>

                  {isAdmin ? (
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-circle p-2"
                        onClick={() => navigate(`/edit/${book.bookid}`)}
                        title="Edit Book"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-circle p-2"
                        onClick={() => handleDelete(book.bookid)}
                        title="Delete Book"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-modern-primary py-1 px-3"
                      onClick={() => handleAddToCart(book.bookid)}
                      disabled={book.quantity <= 0}
                    >
                      <FaCartPlus className="me-1" /> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-5 glass-card my-4">
          <FaBookOpen size={48} className="text-muted mb-3 opacity-50" />
          <h4 className="fw-bold font-heading">No books found</h4>
          <p className="text-muted small">Try selecting a different genre or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default BookList;