import React from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
function Footer() {
  return (
   
    <div className='footer_outer_container'>
      <div className='footer_inner_container'>
        <div className='footer_icons'>
             <FacebookIcon/>
             <InstagramIcon/>
              <YouTubeIcon/>
          </div>
          <div className='footer_data'>
            <div className='first_div'>
                 <ul>
                  <li>Audio Description</li>
                  <li> Investor Relations</li>
                  <li>Legal Notice</li>

                 </ul>
            </div>
            <div>
              <ul>
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Cookie Preferences</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Gift Cards</li>
                <li>Terms of Use</li>
                <li>Corporate Information</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Media Center</li>
                <li>Privacy</li>
                <li> Contact Use</li>
              </ul>
            </div>
            </div>
            <div className='service_code'>
              <p>Service Code</p>
            </div>
            <div  className='copy-write'>
              <p><CopyrightIcon style={{ fontSize: '14px' }} />  1997-2025 Netflix, Inc.</p>
            </div>
         
      </div>
        
    </div>
    
  )
}

export default Footer