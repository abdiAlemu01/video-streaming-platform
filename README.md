# 🎬 Video Streaming Platform (Netflix Clone)

A modern, full-featured video streaming web application inspired by Netflix. Built with React, this project focuses on delivering a clean UI, smooth user experience, and scalable architecture using real-world best practices.


## 🌐 Live Demo

* Local: [http://localhost:3000](http://localhost:3000)
* Production: (Add your deployment link here)


##  Overview

This project replicates the core experience of a streaming platform like Netflix, including dynamic content browsing, search functionality, and responsive design. It integrates with the TMDB API to fetch real-time movie and TV show data.

##  Key Features

###  User Interface

* Dynamic header with scroll effects
* Responsive navigation (desktop, tablet, mobile)
* Hero banner with featured content
* Smooth animations using Framer Motion

###  Content Browsing

* Categorized rows (Trending, Top Rated, Originals, etc.)
* Horizontal scrolling with hover effects
* Lazy loading for performance optimization

###  Search Functionality

* Real-time search with debouncing
* Multi-type search (movies, TV shows, people)
* Keyboard navigation support

###  Video Player

* YouTube trailer integration
* Smooth open/close transitions
* Auto-scroll to active video

###  Responsive Design

* Mobile-first design approach
* Optimized for all screen sizes
* Touch and keyboard interactions supported

---

##  Tech Stack

### Frontend

* React 19
* React Router DOM
* Styled Components
* Framer Motion

### API & Data

* TMDB API
* Axios
* React YouTube

### Tools

* ESLint
* Prettier
* Web Vitals

---

##  Installation

### Prerequisites

* Node.js (v16+)
* TMDB API Key

### Setup

```bash
git clone https://github.com/abdiAlemu01/video-streaming-platform.git
cd video-streaming-platform
npm install
```

Create a `.env` file:

```env
REACT_APP_API_KEY=your_tmdb_api_key
```

Run the app:

```bash
npm start
```

Open in browser:

```
http://localhost:3000
```

---

##  Project Structure

```
src/
├── components/
├── pages/
├── utils/
├── assets/
└── App.js
```

---

##  API Integration

Data is fetched from TMDB API:

* Trending content
* Top rated movies
* TV shows
* Search results

---

##  Performance

* Lazy loading images and components
* Debounced search input
* Optimized rendering with React hooks

---

##  Accessibility

* Keyboard navigation
* Responsive layout
* Basic ARIA support

---

##  Contributing

Contributions are welcome.

```bash
# Fork the repo
# Create a new branch
# Submit a pull request
```

---

