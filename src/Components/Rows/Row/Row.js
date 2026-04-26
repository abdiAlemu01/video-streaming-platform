import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import movieTrailer from 'movie-trailer'
import "./row.css"

function Row({ title, fetchUrl, isLargeRow, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original';
  
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        console.log(fetchUrl)
      } catch (error) {
        console.log('error fetching data', error);
      }
    })();
  }, [fetchUrl]);

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

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row_posters'>
        {movies.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`}
          />
        ))}
      </div>
      {/* Removed the local video player - now handled globally */}
    </div>
  );
}

export default Row;



