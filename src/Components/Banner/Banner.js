import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../utils/axios'; 
import requests from '../../utils/requests';

function Banner() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const request = await axios.get(requests.fetchNetflixOriginals);
        
        if (request.data && request.data.results && request.data.results.length > 0) {
          setMovie(
            request.data.results[
              Math.floor(Math.random() * request.data.results.length)
            ]
          );
        } else {
          setError('No content available');
        }
      } catch (error) {
        console.error("Banner error:", error);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function truncate(str, n = 150) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  if (loading) {
    return (
      <div className='banner' style={{ backgroundColor: '#111', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='banner' style={{ backgroundColor: '#111', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '18px' }}>{error}</div>
      </div>
    );
  }

  return (
    <div
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner_buttons'>
          <button className='banner_button play'>Play</button>
          <button className='banner_button'>My List</button>
        </div>
        <h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner_fadeBottom'></div>
    </div>
  );
}

export default Banner;