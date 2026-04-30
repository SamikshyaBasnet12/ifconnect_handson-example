import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import './App.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch popular movies on initial load
  useEffect(() => {
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  }, []);

  const fetchMovies = async (url) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies. Please verify that your TMDB API key in .env is correct.');
      }
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      // If search is empty, go back to popular movies
      fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      return;
    }
    
    fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TMDB Movie Search</h1>
        <SearchForm 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
      </header>

      <main className="app-main">
        {loading && <div className="loading-state">Loading movies...</div>}
        
        {error && <div className="error-state">{error}</div>}
        
        {!loading && !error && <MovieList movies={movies} />}
      </main>
    </div>
  );
}

export default App;
