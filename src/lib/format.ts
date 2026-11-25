import { studioConfig } from '../config/studio.config';

const inrFormatter = new Intl.NumberFormat(studioConfig.locale.numberLocale, {
  style: 'currency',
  currency: studioConfig.locale.currency,
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
}
