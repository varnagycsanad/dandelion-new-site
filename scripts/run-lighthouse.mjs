import { access, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const port = process.env.LIGHTHOUSE_PORT || '4322';
const url = process.env.LIGHTHOUSE_URL || `http://127.0.0.1:${port}/`;
const output = process.argv.includes('--json') ? 'json' : 'html';
const isDesktop = process.argv.includes('--desktop');
const defaultOutputName = isDesktop ? `lighthouse-desktop-report.${output}` : `lighthouse-report.${output}`;
const outputPath = process.env.LIGHTHOUSE_OUTPUT || `tmp/${defaultOutputName}`;
const view = process.argv.includes('--view');

const astroBin = resolve('node_modules/astro/bin/astro.mjs');
const lighthouseBin = resolve('node_modules/lighthouse/cli/index.js');

await mkdir('tmp', { recursive: true });

const preview = spawn(process.execPath, [astroBin, 'preview', '--host', '127.0.0.1', '--port', port], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: false,
});

preview.stdout.on('data', (data) => process.stdout.write(data));
preview.stderr.on('data', (data) => process.stderr.write(data));

try {
  await waitForUrl(url);

  const args = [
    url,
    '--only-categories=performance,accessibility,best-practices,seo',
    `--output=${output}`,
    `--output-path=${outputPath}`,
    '--chrome-flags=--headless=new',
  ];

  if (isDesktop) {
    args.push('--preset=desktop');
  }

  if (view) {
    args.push('--view');
  }

  const code = await run(process.execPath, [lighthouseBin, ...args]);
  process.exitCode = code === 0 || (await fileExists(outputPath)) ? 0 : code;
} finally {
  preview.kill();
}

async function waitForUrl(targetUrl) {
  const started = Date.now();
  const timeoutMs = 30000;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(targetUrl);
      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Preview server did not start within ${timeoutMs / 1000}s: ${targetUrl}`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('error', reject);
    child.on('close', resolve);
  });
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
