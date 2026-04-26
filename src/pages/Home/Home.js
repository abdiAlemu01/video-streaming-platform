import React, { useState, useRef, useEffect } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Banner from '../../Components/Banner/Banner'
import RowList from '../../Components/Rows/RowsList/RowList'
import YouTube from 'react-youtube'

function Home() {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const videoPlayerRef = useRef(null);

  const handleMovieClick = (movie, trailerUrl) => {
    setSelectedMovie(movie);
    setTrailerUrl(trailerUrl);
  };

  // Scroll to video player when trailer is loaded
  useEffect(() => {
    if (trailerUrl && videoPlayerRef.current) {
      // Small delay to ensure the video player is rendered
      setTimeout(() => {
        videoPlayerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [trailerUrl]);

  const closeTrailer = () => {
    setTrailerUrl('');
    setSelectedMovie(null);
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: { 
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    },
  };

  return (
    <div className='app'>
        <Header/>
        <Banner/>
        
        {/* Global Video Player - Appears above all content */}
        {trailerUrl && (
          <div className='global-video-player' ref={videoPlayerRef}>
            <div className='video-container'>
              <div className='video-header'>
                <h2>{selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}</h2>
                <button className='close-video-btn' onClick={closeTrailer}>
                  ✕
                </button>
              </div>
              <YouTube videoId={trailerUrl} opts={opts} />
            </div>
          </div>
        )}
        
        <RowList onMovieClick={handleMovieClick} /> 
        <Footer/>
    </div>
  )
}

export default Home