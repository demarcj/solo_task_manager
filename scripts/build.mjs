import * as esbuild from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const assetsDir = join(distDir, 'assets');

process.chdir(projectRoot);

await rm(distDir, { recursive: true, force: true });
await mkdir(assetsDir, { recursive: true });

const entrySource = await readFile(join(projectRoot, 'src/main.tsx'), 'utf8');

const result = await esbuild.build({
  stdin: {
    contents: entrySource,
    resolveDir: 'src',
    sourcefile: 'main.tsx',
    loader: 'tsx'
  },
  bundle: true,
  minify: true,
  write: false,
  outdir: assetsDir,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: {
    '.css': 'css',
    '.svg': 'dataurl',
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.webp': 'dataurl'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

const jsBundle = result.outputFiles.find((file) => file.path.endsWith('.js'));
const cssBundle = result.outputFiles.find((file) => file.path.endsWith('.css'));
const htmlTemplate = await readFile(join(projectRoot, 'index.html'), 'utf8');

if (!jsBundle) {
  throw new Error('esbuild did not produce a JavaScript bundle.');
}

const html = htmlTemplate
  .replace('/* APP_CSS */', () => cssBundle?.text ?? '')
  .replace('<!-- APP_JS -->', () => jsBundle.text);

await writeFile(join(distDir, 'index.html'), html, 'utf8');