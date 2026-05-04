import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import movieTrailer from 'movie-trailer'
import "./row.css"

function Row({ title, fetchUrl, isLargeRow, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = 'https://image.tmdb.org/t/p/original';
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const request = await axios.get(fetchUrl);
        
        if (request.data && request.data.results) {
          setMovies(request.data.results);
          console.log(`${title} loaded:`, request.data.results.length, 'items');
        } else {
          setError('No content available');
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchUrl, title]);

  const handleClick = (movie) => {
    movieTrailer(movie?.title || movie?.name || movie?.original_name)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const trailerUrl = urlParams.get('v');
        // Call the global movie click handler
        onMovieClick(movie, trailerUrl);
      })
      .catch((error) => {
        console.log('Trailer not found', error);
        // Still call the handler even if no trailer is found
        onMovieClick(movie, null);
      });
  };

  if (loading) {
    return (
      <div className='row'>
        <h1>{title}</h1>
        <div className='row_posters' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <div style={{ color: 'white' }}>Loading {title}...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='row'>
        <h1>{title}</h1>
        <div className='row_posters' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <div style={{ color: 'white' }}>Error loading {title}: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row_posters'>
        {movies.map((movie, index) => (
          movie.poster_path || movie.backdrop_path ? (
            <img
              onClick={() => handleClick(movie)}
              key={index}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name || movie.title || 'Movie poster'}
              className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}

export default Row;



