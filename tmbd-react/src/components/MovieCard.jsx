import React from 'react';

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster+Available';

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown Release Date'}
        </p>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;
