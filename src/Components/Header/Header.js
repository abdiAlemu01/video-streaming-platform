import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NetflixLogo from '../../assets/images/Netflix_logo.png'
function Header() {
  return (
<div className='header_outer_container'>
   <div className='header-container'>
      <div className='header-left'>
        <div className='logo-and-nav'>
         <img src={NetflixLogo} alt='NetflixLogo' className='netflix-logo' />
          <ul>
            <li>Netflix</li>
            <li>Home</li>
            <li>TivShows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by languages</li>
         </ul>
       </div>
      </div>
            <div className='header-right'>
                <ul>
                    <li><SearchIcon/></li>
                    <li><NotificationsNoneIcon/></li>
                     <li><AccountBoxIcon/></li>
                    <li><ArrowDropDownIcon /></li>   
                </ul>
            </div>

     </div>
</div>
  )
}
export default Header