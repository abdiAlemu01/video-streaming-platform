import React, { useState } from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = ['English', 'Español', 'Français', 'Deutsch', '日本語', '한국어'];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/netflix', label: 'Facebook' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/netflix', label: 'Instagram' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/netflix', label: 'Twitter' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com/netflix', label: 'YouTube' }
  ];

  const footerLinks = [
    {
      category: 'Company',
      links: [
        { text: 'About Netflix', url: '#' },
        { text: 'Investor Relations', url: '#' },
        { text: 'Jobs', url: '#' },
        { text: 'Media Center', url: '#' }
      ]
    },
    {
      category: 'Support',
      links: [
        { text: 'Help Center', url: '#' },
        { text: 'Contact Us', url: '#' },
        { text: 'Account', url: '#' },
        { text: 'Redeem Gift Cards', url: '#' }
      ]
    },
    {
      category: 'Legal',
      links: [
        { text: 'Terms of Use', url: '#' },
        { text: 'Privacy Policy', url: '#' },
        { text: 'Cookie Preferences', url: '#' },
        { text: 'Legal Notices', url: '#' }
      ]
    },
    {
      category: 'Ways to Watch',
      links: [
        { text: 'Watch on TV', url: '#' },
        { text: 'Watch on Mobile', url: '#' },
        { text: 'Audio Description', url: '#' },
        { text: 'Corporate Information', url: '#' }
      ]
    }
  ];

  return (
    <footer className='footer_outer_container'>
      <div className='footer_inner_container'>
        
        {/* Social Media Icons */}
        <div className='footer_social_section'>
          <h3>Connect with us</h3>
          <div className='footer_social_icons'>
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className='social_icon_link'
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className='footer_links_grid'>
          {footerLinks.map((section, index) => (
            <div key={index} className='footer_links_column'>
              <h4 className='footer_section_title'>{section.category}</h4>
              <ul className='footer_links_list'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className='footer_link'>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language Selector */}
        <div className='footer_language_section'>
          <div className='language_selector'>
            <div 
              className='language_dropdown'
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <LanguageIcon className='language_icon' />
              <span>{selectedLanguage}</span>
              <KeyboardArrowDownIcon 
                className={`dropdown_arrow ${isLanguageDropdownOpen ? 'open' : ''}`} 
              />
            </div>
            
            {isLanguageDropdownOpen && (
              <div className='language_options'>
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className={`language_option ${selectedLanguage === language ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Service Code */}
        <div className='footer_service_section'>
          <button className='service_code_btn'>
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <div className='footer_copyright'>
          <p>
            <CopyrightIcon className='copyright_icon' />
            1997-{new Date().getFullYear()} Netflix Stream Video, Inc.
          </p>
          <p className='footer_disclaimer'>
            This is a demo application created for educational purposes. 
            Not affiliated with Netflix, Inc.
          </p>
        </div>

        {/* Additional Info */}
        <div className='footer_additional_info'>
          <div className='footer_badges'>
            <span className='quality_badge'>4K Ultra HD</span>
            <span className='quality_badge'>HDR</span>
            <span className='quality_badge'>Dolby Atmos</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer