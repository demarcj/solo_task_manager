import type { MouseEvent, ReactNode } from 'react';
import { signal } from '@preact/signals-react';

const get_route_path = () => {
  if (globalThis.location?.protocol === 'file:') {
    return globalThis.location.hash.replace(/^#/, '') || '/';
  }

  return globalThis.location?.pathname ?? '/';
};

const get_link_href = (href: string) => {
  if (globalThis.location?.protocol === 'file:') {
    return `#${href}`;
  }

  return href;
};

export const current_path = signal(get_route_path());

const navigate = (href: string) => {
  if (href === current_path.peek()) {
    return;
  }

  if (globalThis.location?.protocol === 'file:') {
    globalThis.location.hash = href;
    current_path.value = href;
    return;
  }

  globalThis.history.pushState(null, '', href);
  current_path.value = get_route_path();
};

if (typeof globalThis.addEventListener === 'function') {
  globalThis.addEventListener('popstate', () => {
    current_path.value = get_route_path();
  });

  globalThis.addEventListener('hashchange', () => {
    current_path.value = get_route_path();
  });
}

interface AppLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export const AppLink = ({ children, className, href }: AppLinkProps) => {
  const on_click = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.altKey
      || event.ctrlKey
      || event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a className={className} href={get_link_href(href)} onClick={on_click}>
      {children}
    </a>
  );
};
