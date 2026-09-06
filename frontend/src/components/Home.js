import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaBook, FaStar, FaGlobe, FaLightbulb, FaHeart, FaTimes, FaCommentAlt, FaMagic } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import FeaturedBooks from './FeaturedBooks';

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [newArrivals, setNewArrivals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetchFeaturedBooks();
    fetchRecommendedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      const allBooks = response.data;

      const sortedByYear = [...allBooks].sort((a, b) => parseInt(b.publicationYear || 0) - parseInt(a.publicationYear || 0));
      setNewArrivals(sortedByYear.slice(0, 8));

      const sortedByRating = [...allBooks].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      setTopRated(sortedByRating.slice(0, 8));
    } catch (error) {
      console.error('Error fetching featured books:', error);
    }
  };

  const fetchRecommendedBooks = async () => {
    try {
      const response = await axios.get('/api/recommendations/popular');
      setRecommended(response.data);
    } catch (error) {
      console.error('Error fetching recommended books:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const genres = [
    { name: 'Fiction', icon: <FaBook /> },
    { name: 'Science', icon: <FaLightbulb /> },
    { name: 'Fantasy', icon: <FaStar /> },
    { name: 'History', icon: <FaGlobe /> },
    { name: 'Mystery', icon: <FaSearch /> },
    { name: 'Romance', icon: <FaHeart /> },
  ];

  return (
    <div className="pb-5 position-relative">
      {/* Hero Section */}
      <section className="hero-wrapper text-center d-flex flex-column justify-content-center align-items-center">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-lg-10 mx-auto"
          >
            <div className="hero-pill-tag mx-auto">
              <FaMagic className="text-primary" /> Discover Over 10,000+ Curated Books
            </div>

            <h1 className="hero-title-main">
              Unleash Your Imagination with <span className="text-gradient">BookHaven</span>
            </h1>

            <p className="lead mb-4 text-secondary mx-auto col-md-9" style={{ fontSize: '1.15rem' }}>
              Your gateway to timeless literary classics, bestsellers, and real-time community reviews.
            </p>

            <form onSubmit={handleSearch} className="d-flex justify-content-center w-100 mb-4">
              <div className="search-box-glass input-group w-100" style={{ maxWidth: '680px' }}>
                <input
                  type="text"
                  className="form-control search-box-input"
                  placeholder="Search by title, author, or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-modern-primary px-4" type="submit">
                  <FaSearch /> Search
                </button>
              </div>
            </form>

            <div className="d-flex align-items-center justify-content-center gap-3 text-muted small">
              <span className="fw-semibold">Popular Searches:</span>
              <Link to="/search?genre=Fiction" className="badge bg-white text-secondary border px-3 py-1 text-decoration-none">Fiction</Link>
              <Link to="/search?genre=Science" className="badge bg-white text-secondary border px-3 py-1 text-decoration-none">Science</Link>
              <Link to="/search?genre=Fantasy" className="badge bg-white text-secondary border px-3 py-1 text-decoration-none">Fantasy</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Sections */}
      {recommended.length > 0 && <FeaturedBooks title="Recommended for You" books={recommended} />}
      <FeaturedBooks title="New Arrivals" books={newArrivals} />
      <FeaturedBooks title="Top Rated Books" books={topRated} />

      {/* Browse by Genre Section */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold font-heading text-primary m-0">Browse by Genre</h3>
          <p className="text-muted small">Find your favorite category with one click</p>
        </div>
        <div className="row g-4 justify-content-center">
          {genres.map((genre, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-4 col-lg-2"
              whileHover={{ y: -6 }}
            >
              <Link to={`/search?genre=${genre.name}`} className="text-decoration-none">
                <div className="genre-card">
                  <div className="genre-icon-wrapper">{genre.icon}</div>
                  <h6 className="fw-bold text-dark m-0">{genre.name}</h6>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Chat Button */}
      {!isAdmin && (
        <motion.button
          className="btn btn-modern-primary rounded-circle p-0 d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            width: '58px',
            height: '58px',
            zIndex: 9999,
            border: '2px solid white'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContact(!showContact)}
        >
          {showContact ? <FaTimes size={22} color="white" /> : <FaCommentAlt size={22} color="white" />}
        </motion.button>
      )}
    </div>
  );
};

export default Home;