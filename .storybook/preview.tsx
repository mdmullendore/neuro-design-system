import type { Preview } from "@storybook/react-vite";
import "@neuro/design-system/neurotransmitters/index.scss";
import { neuroTheme } from "./theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    docs: {
      theme: neuroTheme,
    },

    options: {
      storySort: {
        order: [
          "Getting Started",
          ["Welcome"],
          "Neurons",
          "Synapses",
          "Circuits",
          "Pathways",
          "Cortex",
        ],
      },
    },
  },
};

export default preview;
