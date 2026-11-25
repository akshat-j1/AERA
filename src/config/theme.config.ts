export const themeConfig = {
  palette: {
    softWhite: '#FCFAF7',
    softPeach: '#F4E5DA',
    warmClay: '#EFE0D5',
    sandstone: '#D4BEB0',
    mutedRose: '#DEB0A3',
    terracotta: '#B76E5D',
    terracottaInk: '#874030',
    cocoa: '#493B36',
    espresso: '#2C221E',
  },
  typography: {
    displayEditorial: '"Fraunces Variable", Georgia, serif',
    displayModern: '"Syne Variable", ui-sans-serif, system-ui, sans-serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif',
  },
  motion: {
    entranceDurationMs: 2850,
    silkEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    lenisLerp: 0.085,
  },
} as const;
