import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import NetflixLogo from '../../assets/images/Netflix_logo.png'
import axios from '../../utils/axios'

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications] = useState([
    { 
      id: 1, 
      title: 'New episodes available', 
      content: 'Stranger Things Season 5 - 3 new episodes', 
      time: '2h ago', 
      unread: true,
      image: 'https://image.tmdb.org/t/p/w200/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'
    },
    { 
      id: 2, 
      title: 'Added to your list', 
      content: 'The Crown - Successfully added to My List', 
      time: '1d ago', 
      unread: true,
      image: 'https://image.tmdb.org/t/p/w200/1M876KPjulVwppEpldhdc8V4o68.jpg'
    },
    { 
      id: 3, 
      title: 'Recommended for you', 
      content: 'Black Mirror - Based on your viewing history', 
      time: '3d ago', 
      unread: false,
      image: 'https://image.tmdb.org/t/p/w200/5UaYsGZOFhjFDwQh6GuLjjA5WfA.jpg'
    },
    { 
      id: 4, 
      title: 'Continue watching', 
      content: 'The Witcher - Episode 4 awaits', 
      time: '5d ago', 
      unread: false,
      image: 'https://image.tmdb.org/t/p/w200/7vjaCdMw15FEbXyLQTVa04URsPm.jpg'
    }
  ]);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Navigation items with icons and descriptions
  const navItems = [
    { name: 'Home', icon: <HomeIcon />, active: true, description: 'Browse all content' },
   ];

  // User profiles
  const [profiles] = useState([
    { id: 1, name: 'John Doe', avatar: '👨‍💼', active: true, type: 'Adult' },
    { id: 2, name: 'Jane Doe', avatar: '👩‍💻', active: false, type: 'Adult' },
    { id: 3, name: 'Kids', avatar: '🧒', active: false, type: 'Kids' }
  ]);

  

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
        if (!searchQuery) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!showResults || searchResults.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          setShowResults(false);
          setSelectedIndex(-1);
          if (!searchQuery) {
            setIsSearchOpen(false);
          }
          break;
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showResults, searchResults, selectedIndex, searchQuery, isSearchOpen]);


  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  const performSearch = async (query) => {
    setIsLoading(true);
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const response = await axios.get(`/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
      const results = response.data.results
        .filter(item => item.media_type !== 'person' && (item.poster_path || item.backdrop_path))
        .slice(0, 8);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (item) => {
    console.log('Selected item:', item);
    setShowResults(false);
    setTimeout(() => {
      setSearchQuery('');
      setIsSearchOpen(false);
    }, 200);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2 && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w200${path}` : null;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileMenuOpen(false);
  };

  const markNotificationAsRead = (id) => {
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  };

  const switchProfile = (profile) => {
    setIsProfileMenuOpen(false);
  };

  return (
    <header className={`header_outer_container ${isScrolled ? 'scrolled' : ''}`}>
      <div className='header-container'>
        
        <div className='header-left'>
          <div className='logo-container'>
            <img src={NetflixLogo} alt='Netflix Logo' className='netflix-logo' />
            <span className='brand-text'>Stream Video</span>
          </div>
          
         
          <nav className='desktop-nav'>
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className={item.active ? 'active' : ''}>
                  <a href="#" className='nav-link' title={item.description}>
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className='mobile-menu-btn' onClick={toggleMobileMenu} title="Menu">
            <MenuIcon />
          </button>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className='header-right'>
          
          {/* Search Container */}
          <div className='search-container' ref={searchContainerRef}>
            {!isSearchOpen ? (
              <button className='icon-btn search-btn' onClick={handleSearchIconClick} title="Search">
                <SearchIcon />
              </button>
            ) : (
              <div className='search-input-container'>
                <SearchIcon className='search-icon-input' />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search movies, TV shows, people..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className='search-input'
                />
                <button className='close-btn' onClick={handleCloseSearch} title="Close search">
                  <CloseIcon />
                </button>
              </div>
            )}
            
            {showResults && (
              <div className='search-results'>
                {isLoading ? (
                  <div className='search-loading'>
                    <div className='loading-spinner'></div>
                    <span>Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className='search-results-header'>
                      <span>Search Results ({searchResults.length})</span>
                    </div>
                    {searchResults.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                        onClick={() => handleResultClick(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        tabIndex={0}
                      >
                        {getImageUrl(item.poster_path || item.backdrop_path) && (
                          <img 
                            src={getImageUrl(item.poster_path || item.backdrop_path)}
                            alt={item.title || item.name}
                            className='search-result-image'
                          />
                        )}
                        <div className='search-result-info'>
                          <h4>{item.title || item.name}</h4>
                          <p>{item.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                          <div className='result-meta'>
                            {item.release_date || item.first_air_date ? (
                              <span className='search-result-year'>
                                {new Date(item.release_date || item.first_air_date).getFullYear()}
                              </span>
                            ) : null}
                            {item.vote_average > 0 && (
                              <span className='search-result-rating'>
                                ⭐ {item.vote_average.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className='search-no-results'>
                    <div className='no-results-icon'>🔍</div>
                    <span>No results found for "{searchQuery}"</span>
                    <p>Try different keywords or check spelling</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className='profile-container'>

            {isProfileMenuOpen && (
              <div className='profile-dropdown'>
                
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}

        {isMobileMenuOpen && (
          <div className='mobile-nav-overlay' onClick={toggleMobileMenu}>
            <div className='mobile-nav-menu' onClick={(e) => e.stopPropagation()}>

            </div>
          </div>
        )}



      </div> 
    </header>
  )
}

export default Header