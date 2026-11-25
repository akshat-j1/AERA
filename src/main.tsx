import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/syne/wght.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/index.css';
import { App } from './App';

const rootEl = document.getElementById('root')!;
const appTree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const ssrPath = rootEl.dataset.ssrPath;
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

if (rootEl.hasChildNodes() && (!ssrPath || ssrPath === currentPath)) {
  hydrateRoot(rootEl, appTree);
} else {
  createRoot(rootEl).render(appTree);
}
