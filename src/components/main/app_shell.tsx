import type { ReactNode } from 'react';
import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { StartPrompt } from '../dialog/start_prompt';
import { Timer } from '../standalones/timer';

const is_start_prompt_open = signal(true);

export const AppShell = ({ children }: { children: ReactNode }) => {
  useSignals();

  return (
    <>
      <StartPrompt
        open={is_start_prompt_open.value}
        onClose={() => {
          is_start_prompt_open.value = false;
        }}
      />
      <Timer />
      {children}
    </>
  );
};
