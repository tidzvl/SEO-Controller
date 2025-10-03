import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import './Navbar.css';

const Navbar = ({ activeTab = 'Overview', onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();

  const menuItems = ['Overview', 'Data Center', 'Workflow', 'Analytics'];

  const handleTabClick = (item) => {
    if (onTabChange) {
      onTabChange(item);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path 
                d="M16 4L4 10V22L16 28L28 22V10L16 4Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              <path 
                d="M16 4V28M4 10L28 22M28 10L4 22" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="brand-name">SEO-Controller</span>
        </div>

        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item} className="menu-item">
              <button
                className={`menu-link ${activeTab === item ? 'active' : ''}`}
                onClick={() => handleTabClick(item)}
              >
                {item}
                {activeTab === item && <span className="active-indicator" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
