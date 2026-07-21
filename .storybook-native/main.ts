import type { StorybookConfig } from "@storybook/react-native-web-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../packages/design-system/src/**/*.mdx",
    "../packages/design-system/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
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
  ],
  framework: "@storybook/react-native-web-vite",
  // Serves public/favicon.svg (auto-detected as the manager favicon) and makes it
  // available at /favicon.svg for the manager theme's brandImage.
  staticDirs: ["../public"],
  async viteFinal(viteConfig) {
    // The root vite.config.ts (used by the web app + web Storybook) registers its own
    // @vitejs/plugin-react, and Storybook merges that in alongside the RN-Web framework's
    // own React plugin set. Without deduping, the "vite:react-*" plugins (and the Fast
    // Refresh preamble they inject into index.html) end up doubled, which crashes the
    // browser with "Identifier 'RefreshRuntime' has already been declared".
    const flatten = (plugins: unknown[]): unknown[] =>
      plugins.flatMap((p) => (Array.isArray(p) ? flatten(p) : [p]));
    const seen = new Set<string>();
    viteConfig.plugins = flatten(viteConfig.plugins ?? []).filter((plugin) => {
      const name = (plugin as { name?: string })?.name;
      if (!name || !name.startsWith("vite:react-")) return true;
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    }) as typeof viteConfig.plugins;

    // Vite has no built-in notion of platform-specific extensions (unlike Metro), so
    // "./Button" resolves to Button.tsx unless we explicitly prioritize .native.tsx here.
    const defaultExtensions = [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"];
    viteConfig.resolve = {
      ...viteConfig.resolve,
      extensions: [
        ".native.tsx",
        ".native.ts",
        ".native.jsx",
        ".native.js",
        ...(viteConfig.resolve?.extensions ?? defaultExtensions),
      ],
    };

    return viteConfig;
  },
};
export default config;
