/**
 * Options React Entry Point
 * 
 * This file is the entry point for the options/settings page.
 * It renders the React app into the DOM for the options.html
 * 
 * Path: src/options-main.jsx
 * Used by: public/options.html
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import Options from './pages/Options';
import './styles/globals.css';

/**
 * Create React root and render Options component
 * This mounts the React app into the #root element in options.html
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
