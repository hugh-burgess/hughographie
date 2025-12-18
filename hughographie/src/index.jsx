import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import App from "./App"
import './css';

import Page from './storyblok/Page';

storyblokInit({
  accessToken: process.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
  },
  apiOptions: {
    region: 'eu',
  },
});

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <App/>
  </StrictMode>
);