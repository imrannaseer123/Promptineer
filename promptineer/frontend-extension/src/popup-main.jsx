/**
 * Popup React Entry Point
 * 
 * This file is the entry point for the popup page.
 * It renders the React app into the DOM for the popup.html
 * 
 * Path: src/popup-main.jsx
 * Used by: public/popup.html
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './pages/Popup';
import './styles/globals.css';

/**
 * Create React root and render Popup component
 * This mounts the React app into the #root element in popup.html
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
