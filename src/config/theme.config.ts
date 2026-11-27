export const themeConfig = {
  palette: {
    porcelain: '#FCFAFA',
    alabaster: '#F5F0F3',
    softLilac: '#E8DFED',
    dustyRose: '#DDBBC7',
    mutedBerry: '#98647A',
    berryInk: '#7B4A60',
    plumInk: '#40343D',
    aubergine: '#2A2028',
    borderMist: '#DED2DA',
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
