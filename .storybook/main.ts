import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../packages/design-system/src/**/*.mdx",
    "../packages/design-system/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    // GFM (tables, strikethrough, task lists, ...) isn't enabled by MDX out of the
    // box — addon-docs needs remark-gfm passed through explicitly.
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  // Serves public/favicon.svg (auto-detected as the manager favicon) and makes it
  // available at /favicon.svg for the manager theme's brandImage.
  staticDirs: ["../public"],
};
export default config;
