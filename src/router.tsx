import type { ComponentType } from 'react';
import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

export type AppRoute = {
  path: string;
  component: ComponentType;
};

type RouterProps = {
  routes: AppRoute[];
  fallback?: ComponentType;
};

const normalizePath = (path: string) => {
  const normalized = path.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
};

export const currentPath = signal(normalizePath(window.location.pathname));

window.addEventListener('popstate', () => {
  currentPath.value = normalizePath(window.location.pathname);
});

export const navigate = (to: string) => {
  const nextPath = normalizePath(to);

  if (nextPath === currentPath.value) {
    return;
  }

  window.history.pushState(null, '', nextPath);
  currentPath.value = nextPath;
};

export const Router = ({ routes, fallback: Fallback }: RouterProps) => {
  useSignals();

  const route = routes.find((item) => normalizePath(item.path) === currentPath.value);
  const RouteComponent = route?.component ?? Fallback ?? routes[0]?.component;

  return RouteComponent ? <RouteComponent /> : null;
};
