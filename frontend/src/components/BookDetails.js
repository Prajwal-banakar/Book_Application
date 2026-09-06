import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaUserCircle, FaCartPlus, FaBookOpen, FaHeart, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import FeaturedBooks from './FeaturedBooks';

const StarRating = ({ rating, size = 16 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="text-warning" size={size} />
      ) : (
        <FaRegStar key={i} className="text-muted opacity-50" size={size} />
      )
    );
  }
  return <div className="d-flex gap-1 align-items-center">{stars}</div>;
};

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [inWishlist, setInWishlist] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBookAndReviews();
    checkWishlist();
    fetchRecommendations();
  }, [id]);

  const fetchBookAndReviews = async () => {
    try {
      const [bookRes, reviewsRes] = await Promise.all([
        axios.get(`/api/books/${id}`),
        axios.get(`/api/reviews/${id}`)
      ]);
      setBook(bookRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Failed to fetch book data', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`/api/books/recommendations/${id}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    }
  };

  const checkWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      if (response.data && response.data.bookIds && response.data.bookIds.includes(id)) {
        setInWishlist(true);
      }
    } catch (error) {
      console.error('Failed to check wishlist', error);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart(book.bookid);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a star rating.');
      return;
    }
    try {
      await axios.post('/api/reviews', { ...newReview, bookId: id });
      setNewReview({ rating: 0, comment: '' });
      fetchBookAndReviews();
    } catch (error) {
      alert('Failed to submit review.');
    }
  };

  const handleWishlistClick = async () => {
    try {
      if (inWishlist) {
        await axios.delete(`/api/wishlist/${id}`);
      } else {
        await axios.post(`/api/wishlist/${id}`);
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      alert('Failed to update wishlist.');
    }
  };

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading book details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Detail Showcase Card */}
      <div className="glass-container p-4 p-md-5 mb-5 shadow-lg border-0">
        <div className="row g-5 align-items-center">
          {/* Cover Art */}
          <div className="col-md-5 col-lg-4">
            <div className="book-card-modern p-2 shadow-lg">
              <div className="book-cover-container" style={{ paddingTop: '140%' }}>
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
                  className="book-cover-placeholder position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    display: book.coverImageUrl ? 'none' : 'flex'
                  }}
                >
                  <FaBookOpen size={64} className="mb-3 opacity-75" />
                  <h4 className="fw-bold m-0">{book.title}</h4>
                  <p className="small opacity-75">{book.author}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="col-md-7 col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-15 rounded-pill" style={{ fontSize: '0.8rem' }}>
                {book.genre || 'Literature & Fiction'}
              </span>
              <span className={`badge ${book.quantity > 0 ? 'badge-approved' : 'badge-cancelled'}`}>
                {book.quantity > 0 ? `${book.quantity} Available in Stock` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="fw-bold font-heading display-6 mb-2 text-primary">{book.title}</h1>
            <p className="fs-5 text-secondary mb-3">By <span className="fw-semibold text-dark">{book.author}</span></p>

            <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
              <StarRating rating={book.averageRating || 4.5} size={20} />
              <span className="fw-bold text-dark">{book.averageRating ? book.averageRating.toFixed(1) : '4.5'}</span>
              <span className="text-muted">({reviews.length} customer reviews)</span>
            </div>

            <div className="d-flex align-items-baseline gap-3 mb-4">
              <span className="display-6 fw-extrabold text-primary font-heading">₹{book.price}</span>
              <span className="text-muted small">Inclusive of all taxes</span>
            </div>

            {/* Quick Metadata Table */}
            <div className="row g-3 mb-4">
              <div className="col-6 col-sm-4">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="text-muted small d-block">Publisher</span>
                  <span className="fw-bold small text-dark">{book.publisher || 'BookHaven Publishing'}</span>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="text-muted small d-block">Publication Year</span>
                  <span className="fw-bold small text-dark">{book.publicationYear || '2023'}</span>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="text-muted small d-block">Language</span>
                  <span className="fw-bold small text-dark">{book.language || 'English'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex flex-wrap gap-3 pt-2">
              <button
                className="btn btn-modern-primary py-3 px-5 font-heading fw-bold fs-6 d-flex align-items-center gap-2"
                onClick={handleAddToCart}
                disabled={book.quantity <= 0}
              >
                <FaCartPlus size={20} /> {book.quantity > 0 ? 'Add to Cart' : 'Currently Unavailable'}
              </button>

              <button
                className={`btn btn-lg rounded-pill px-4 transition-all d-flex align-items-center gap-2 ${
                  inWishlist ? 'btn-danger' : 'btn-outline-danger'
                }`}
                onClick={handleWishlistClick}
              >
                <FaHeart size={18} /> {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-success mt-3 py-2 px-3 small d-inline-flex align-items-center gap-2 rounded-pill"
              >
                <FaCheckCircle /> Book added to cart successfully!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Carousel */}
      {recommendations.length > 0 && (
        <FeaturedBooks title="You Might Also Like" books={recommendations} />
      )}

      {/* Reviews Grid & Submission */}
      <div className="row g-4 mt-4">
        <div className="col-lg-7">
          <h4 className="fw-bold font-heading text-primary mb-4">Customer Reviews & Ratings</h4>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="glass-card p-4 mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <FaUserCircle size={24} className="text-primary" />
                    <span className="fw-bold text-dark">{review.username}</span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-secondary mb-2">{review.comment}</p>
                <small className="text-muted">{new Date(review.timestamp).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <div className="glass-card p-4 text-center">
              <p className="text-muted m-0">No reviews yet for this title. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="col-lg-5">
          <div className="glass-container p-4">
            <h4 className="fw-bold font-heading text-primary mb-3">Write a Review</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Rating</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{ cursor: 'pointer' }}
                      className="transition-all hover-scale"
                    >
                      {star <= newReview.rating ? (
                        <FaStar size={24} className="text-warning" />
                      ) : (
                        <FaRegStar size={24} className="text-muted opacity-50" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">Your Review</label>
                <textarea
                  className="form-control form-control-modern"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="What did you think of the storyline, character development, or pacing?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-modern-primary w-100 py-25 font-heading fw-bold">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;