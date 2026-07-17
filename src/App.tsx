import { Button } from "./neurons/Button";

function App() {
  return (
    <main className="sero-p-xl sero-stack-md">
      <h1 className="glu-text-xl dop-text-primary">Neuro Design System</h1>
      <p className="glu-text-md dop-text-muted">
        Build components in Storybook, tier by tier — Neuron to Cortex.
      </p>
      <div className="sero-gap-sm" style={{ display: "flex" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </main>
  );
}

export default App;
