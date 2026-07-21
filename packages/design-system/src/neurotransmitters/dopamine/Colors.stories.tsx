import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorItem, ColorPalette } from "@storybook/addon-docs/blocks";
import { ThemeProvider, convert, themes } from "storybook/theming";
import { brand, color, palette } from "../../tokens";

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const withKebabKeys = (obj: Record<string, string>) =>
  Object.fromEntries(Object.entries(obj).map(([name, value]) => [kebab(name), value]));

function Colors() {
  return (
    // ColorPalette/ColorItem are doc blocks — outside a docs page they render without the
    // emotion theme those blocks read from, which throws. Provide it explicitly here.
    <ThemeProvider theme={convert(themes.dark)}>
      <ColorPalette>
        <ColorItem title="Brand" subtitle="dop-*-brand-*" colors={withKebabKeys(brand)} />
        <ColorItem title="Semantic" subtitle="dop-*-*" colors={withKebabKeys(color)} />
        {Object.entries(palette).map(([hue, shades]) => (
          <ColorItem key={hue} title={hue} subtitle={`dop-*-${hue}-*`} colors={shades} />
        ))}
      </ColorPalette>
    </ThemeProvider>
  );
}

const meta = {
  title: "Neurotransmitters/Dopamine/Colors",
  render: Colors,
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
