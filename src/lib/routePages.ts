import { lazy, type ComponentType } from 'react';
import type { RoutePath } from './routePaths';

const pageLoaders = {
  '/': () => import('../pages/HomePage').then((module) => ({ default: module.HomePage })),
  '/services': () => import('../pages/ServicesPage').then((module) => ({ default: module.ServicesPage })),
  '/team': () => import('../pages/TeamPage').then((module) => ({ default: module.TeamPage })),
  '/bridal': () => import('../pages/BridalPage').then((module) => ({ default: module.BridalPage })),
  '/gallery': () => import('../pages/GalleryPage').then((module) => ({ default: module.GalleryPage })),
  '/about': () => import('../pages/AboutPage').then((module) => ({ default: module.AboutPage })),
  '/enquire': () => import('../pages/EnquirePage').then((module) => ({ default: module.EnquirePage })),
  '/404': () => import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
} satisfies Record<RoutePath, () => Promise<{ default: ComponentType }>>;

export const lazyPages = new Map(
  Object.entries(pageLoaders).map(([path, load]) => [path, lazy(load)])
);

export async function loadRoutePage(path: RoutePath) {
  return (await pageLoaders[path]()).default;
}
