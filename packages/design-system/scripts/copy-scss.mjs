import { cpSync, globSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
for (const file of globSync("src/**/*.scss", { cwd: root })) {
  const to = join(root, "dist", file.slice("src/".length));
  mkdirSync(dirname(to), { recursive: true });
  cpSync(join(root, file), to);
}
