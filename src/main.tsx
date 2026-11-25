import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/syne/wght.css';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/index.css';
import { App } from './App';

import { getRoutePath } from './lib/routePaths';
import { loadRoutePage } from './lib/routePages';

async function start() {
  const root = document.getElementById('root')!;
  const route = getRoutePath(location.pathname);
  const InitialPage = await loadRoutePage(route);
  document.documentElement.dataset.aeraEnhanced = '';
  const tree = (
    <StrictMode>
      <BrowserRouter>
        <App initialRoute={route} InitialPage={InitialPage} />
      </BrowserRouter>
    </StrictMode>
  );

  if (root.hasChildNodes() && root.dataset.ssrPath === route) {
    hydrateRoot(root, tree, {
      onRecoverableError(error) {
        window.aeraEntrance?.close();
        console.error(error);
      },
    });
  } else {
    createRoot(root).render(tree);
  }
}

start().catch((error: unknown) => {
  delete document.documentElement.dataset.aeraEnhanced;
  window.aeraEntrance?.close();
  console.error(error);
});
