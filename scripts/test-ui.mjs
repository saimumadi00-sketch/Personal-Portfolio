import { build } from 'esbuild'
import { mkdtemp, rm } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
const directory = await mkdtemp('.test-tmp-')
try {
  await build({ entryPoints: ['tests/ui.test.jsx'], outfile: `${directory}/ui.test.mjs`, bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic' })
  const result = spawnSync(process.execPath, ['--test', `${directory}/ui.test.mjs`], { stdio: 'inherit' })
  process.exitCode = result.status ?? 1
} finally { await rm(directory, { recursive: true, force: true }) }
