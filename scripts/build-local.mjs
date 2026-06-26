import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const project_root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output_dir = resolve(project_root, 'dist-local');
const assets_dir = resolve(output_dir, 'assets');

await rm(output_dir, { recursive: true, force: true });
await mkdir(assets_dir, { recursive: true });

await build({
  entryPoints: [resolve(project_root, 'src/main.tsx')],
  bundle: true,
  outfile: resolve(assets_dir, 'app.js'),
  format: 'iife',
  minify: true,
  sourcemap: false,
  jsx: 'automatic',
  alias: {
    '@': resolve(project_root, 'src')
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.js': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css'
  },
  logLevel: 'info'
});

const css_link = existsSync(resolve(assets_dir, 'app.css'))
  ? '    <link rel="stylesheet" href="./assets/app.css" />\n'
  : '';

await writeFile(
  resolve(output_dir, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="A focused study and task dashboard for philosophy of art work."
    />
${css_link}    <title>Personal Task Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script defer src="./assets/app.js"></script>
  </body>
</html>
`
);
