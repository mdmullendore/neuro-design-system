import "@neuro/design-system/neurotransmitters/index.scss";
import { neuroTheme } from "../.storybook/theme";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
