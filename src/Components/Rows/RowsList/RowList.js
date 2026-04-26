import React from 'react'
import Row from '../Row/Row'
import requests from '../../../utils/requests'

function RowList({ onMovieClick }) {
  return (
    <div>
       <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} onMovieClick={onMovieClick}/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieClick={onMovieClick}/>
        <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} onMovieClick={onMovieClick}/>
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieClick={onMovieClick}/>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onMovieClick={onMovieClick}/>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieClick={onMovieClick}/>
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieClick={onMovieClick}/>
        <Row title="TV Shows" fetchUrl={requests.fetchTvShow} onMovieClick={onMovieClick}/>
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onMovieClick={onMovieClick}/>
    </div>
  )
}

export default RowList


