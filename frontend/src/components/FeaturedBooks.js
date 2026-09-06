import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaBookOpen } from 'react-icons/fa';

const FeaturedBooks = ({ title, books }) => {
  if (!books || books.length === 0) return null;

  return (
    <section className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold font-heading text-primary m-0">{title}</h3>
        <Link to="/books" className="btn btn-sm btn-modern-outline px-3 py-1 text-decoration-none">
          View All
        </Link>
      </div>

      <div className="row g-4 flex-nowrap overflow-auto pb-3 scrollbar-hidden">
        {books.map((book) => (
          <motion.div
            key={book.bookid}
            className="col-10 col-sm-6 col-md-4 col-lg-3 flex-shrink-0"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="book-card-modern h-100">
              <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
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
                    <FaBookOpen size={36} className="mb-2 opacity-75" />
                    <span className="fw-bold small line-clamp-2">{book.title}</span>
                  </div>

                  <div className="book-badge-rating">
                    <FaStar /> {book.averageRating ? book.averageRating.toFixed(1) : '4.5'}
                  </div>
                </div>

                <div className="book-card-body">
                  <span className="badge bg-light text-secondary border align-self-start mb-2 px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {book.genre || 'Literature'}
                  </span>
                  <h6 className="book-title mb-1">{book.title}</h6>
                  <p className="book-author mb-3">{book.author}</p>
                  <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="book-price-tag">₹{book.price}</span>
                    <span className="btn btn-sm btn-light rounded-pill px-3 py-1 font-heading fw-bold text-primary border">
                      Details
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;