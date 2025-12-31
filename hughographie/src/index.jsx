import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import App from "./App"
import Layout from "./Layout"
import './css';

import Page from './storyblok/Page';
import Header from './globals/Header';
import Footer from './globals/Footer';
import C1Gallery from './components/C1Gallery';
import C2RichText from './components/C2RichText';
import C3ImageAndText from './components/C3ImageAndText';
import C4Video from './components/C4Video';
import C5Stage from './components/C5Stage';

storyblokInit({
  accessToken: process.env.REACT_APP_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    Header: Header,
    Footer: Footer,
    Gallery: C1Gallery,
    RichText: C2RichText,
    'Image and RichText': C3ImageAndText,
    Video: C4Video,
    Stage: C5Stage,
  },
  apiOptions: {
    region: 'eu',
  },
});

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:slug" element={<App />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);