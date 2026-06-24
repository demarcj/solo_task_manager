import { MainSection } from './components/main/main_section';
import { useSignals, useSignal } from "@preact/signals-react/runtime";
import { StartPrompt } from "./components/dialog/start_prompt"

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
      <MainSection />
      <footer></footer>
    </div>
  );
}

export default App;
