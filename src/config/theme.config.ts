export const themeConfig = {
  palette: {
    porcelain: '#F8F5F1',
    peachMist: '#F3E6DF',
    lilacMist: '#E6DDEB',
    lilacWash: '#F3EEF5',
    dustyRose: '#D5B4B8',
    champagne: '#C8B49D',
    mauve: '#504348',
    plumInk: '#2D2328',
  },
  typography: {
    display: '"Syne Variable", ui-sans-serif, system-ui, sans-serif',
    whisper: '"Fraunces Variable", Georgia, serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif',
  },
  motion: {
    entranceDurationMs: 2750,
    silkEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    lenisLerp: 0.085,
  },
} as const;
