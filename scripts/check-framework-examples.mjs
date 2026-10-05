import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const examples = resolve(root, process.argv[2] ?? '../glidemq-examples');
const markdown = readFileSync(join(root, 'docs/examples/frameworks.md'), 'utf8');
const compiler = join(examples, 'node_modules/typescript/bin/tsc');
const sections = {
  'Hono Basic': 'hono-basic',
  'Hono API': 'hono-api',
  'Fastify API': 'fastify-api',
  'Hapi Basic': 'hapi-basic',
  'Hapi API': 'hapi-api',
  'NestJS Module': 'nestjs-module',
  'Express Dashboard': 'express-dashboard',
};
let failures = 0;
const snippets = Object.entries(sections).map(([heading, directory]) => ({ heading, directory, markdown }));
const honoGuide = readFileSync(join(root, 'docs/integrations/hono.md'), 'utf8');
snippets.push(
  { heading: 'Quick Start', directory: 'hono-api', markdown: honoGuide },
  { heading: 'HTTP Client', directory: 'hono-api', markdown: honoGuide },
);

for (const { heading, directory, markdown } of snippets) {
  const start = markdown.indexOf(`## ${heading}\n`);
  if (start < 0) throw new Error(`Missing section: ${heading}`);
  const next = markdown.indexOf('\n## ', start + 1);
  const section = markdown.slice(start, next < 0 ? undefined : next);
  const code = section.match(/```(?:typescript|ts)\n([\s\S]*?)```/)?.[1];
  if (!code) throw new Error(`Missing TypeScript example: ${heading}`);
  const temporary = mkdtempSync(join(examples, 'examples', directory, '.docs-typecheck-'));
  try {
    writeFileSync(join(temporary, 'example.ts'), code);
    writeFileSync(join(temporary, 'tsconfig.json'), JSON.stringify({
      extends: '../tsconfig.json',
      include: ['example.ts'],
      compilerOptions: { noEmit: true },
    }));
    console.log(`Checking ${heading}`);
    const result = spawnSync(process.execPath, [compiler, '--project', join(temporary, 'tsconfig.json')], {
      cwd: root,
      stdio: 'inherit',
      timeout: 90_000,
    });
    if (result.error || result.status !== 0) {
      console.error(`${heading}: typecheck failed`, result.error?.message ?? '');
      failures++;
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

console.log(`Checked ${snippets.length} framework examples; ${failures} failed.`);
process.exitCode = failures === 0 ? 0 : 1;
