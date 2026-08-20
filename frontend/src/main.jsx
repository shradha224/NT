import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_CLIENT_ID } from './config/env';

// Global Fetch Interceptor to handle 401 Unauthorized (Token Expiration)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  if (response.status === 401) {
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login?expired=true';
    }
  }
  return response;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
