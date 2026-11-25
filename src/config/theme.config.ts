export const themeConfig = {
  palette: {
    porcelain: '#FAF8F7',
    alabaster: '#F2EEF1',
    softLilac: '#E7DFEB',
    dustyRose: '#D8ADB6',
    mutedBerry: '#B77F91',
    berryInk: '#844D60',
    plumInk: '#493D46',
    aubergine: '#2A2128',
    borderMist: '#DCD2D8',
  },
  typography: {
    displayCampaign: '"Syne Variable", ui-sans-serif, system-ui, sans-serif',
    displayModern: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif',
    whisperAccent: '"Fraunces Variable", Georgia, serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif',
  },
  motion: {
    entranceDurationMs: 2650,
    silkEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    lenisLerp: 0.085,
  },
} as const;
