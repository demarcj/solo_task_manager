'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSignal, useSignals } from '@preact/signals-react/runtime';
import { StartPrompt } from '../dialog/start_prompt';
import { Timer } from '../standalones/timer';

export const AppShell = ({ children }: { children: ReactNode }) => {
  useSignals();

  const mounted = useSignal(false);
  const is_start_prompt_open = useSignal(true);

  useEffect(() => {
    mounted.value = true;
    is_start_prompt_open.value = true;
  }, []);

  return (
    <>
      {mounted.value && (
        <>
          <StartPrompt
            open={is_start_prompt_open.value}
            onClose={() => {
              is_start_prompt_open.value = false;
            }}
          />
          <header />
          <main className="app-shell">
            <Timer />
            {children}
          </main>
          <footer />
        </>
      )}
    </>
  );
};
