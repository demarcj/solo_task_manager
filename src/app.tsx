import { Header } from '@/components/header/header';
import { AppShell } from '@/components/main/app_shell';
import { Homepage } from '@/components/main/homepage';
import { Providers } from '@/components/main/providers';
import { TaskPage } from '@/components/main/task_page';
import { current_path } from '@/router';
import { useSignals } from '@preact/signals-react/runtime';

const get_page = () => {
  if (current_path.value.startsWith('/task/')) {
    return <TaskPage />;
  }

  return <Homepage />;
};

export const App = () => {
  useSignals();

  return (
    <Providers>
      <Header />
      <main className="app-shell">
        <AppShell>{get_page()}</AppShell>
      </main>
      <footer />
    </Providers>
  );
};
