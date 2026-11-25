export const routePaths = ['/', '/services', '/team', '/bridal', '/gallery', '/about', '/enquire'] as const;

export type RoutePath = typeof routePaths[number] | '/404';

export function getRoutePath(pathname: string): RoutePath {
  let cleaned: string;
  try {
    cleaned = decodeURI(pathname).replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
  } catch {
    return '/404';
  }
  return routePaths.find((route) => route === cleaned) ?? '/404';
}
