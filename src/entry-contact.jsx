import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './contact.jsx';

hydrateRoot(document.getElementById('root'), <App />);
