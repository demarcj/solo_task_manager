import { Homepage } from './components/main/homepage';
import { TaskPage } from "./components/main/task_page";
import { useSignals, useSignal } from "@preact/signals-react/runtime";
import { StartPrompt } from "./components/dialog/start_prompt";
import { Timer } from "./components/standalones/timer"
import { Router, type AppRoute } from './router';

const routes: AppRoute[] = [
  {
    path: '/',
    component: Homepage
  },
  {
    path: '/task',
    component: TaskPage
  }
];

function App() {
  useSignals();
  const is_start_prompt_open = useSignal(true);

  return (
    <div>
      <StartPrompt
        open={is_start_prompt_open.value}
        onClose={() => is_start_prompt_open.value = false}
      />
      <header></header>
      <main className="app-shell">
        <Timer />
        <Router routes={routes} fallback={Homepage} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
