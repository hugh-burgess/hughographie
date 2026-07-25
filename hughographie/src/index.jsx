import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import App from "./App"
import Layout from "./Layout"
import './styles';

import P1Generic from './pages/P1Generic';
import P2Blog from './pages/P2Blog';
import P3Project from './pages/P3Project';

import Header from './globals/Header';
import Footer from './globals/Footer';

import { DarkModeProvider } from './context/DarkModeContext';

storyblokInit({
  accessToken: process.env.REACT_APP_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    P1Generic,
    P2Blog,
    P3Project,
    Header,
    Footer,
  },
  apiOptions: {
    region: 'eu',
  },
});

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <Layout>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </Layout>
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);