import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
const assets = (await readdir('dist/assets')).sort().map((name) => `/assets/${name}`)
const files = ['/index.html', '/offline.html', '/favicon.svg', '/manifest.json', '/portrait-320.webp', '/portrait-640.webp', '/social-preview.png', '/saimum-al-mahmud-cv.pdf', ...assets]
const hash = createHash('sha256')
for (const file of files) hash.update(file).update(await readFile(`dist${file}`))
const template = await readFile('scripts/service-worker.js', 'utf8')
hash.update(template)
const version = hash.digest('hex').slice(0, 16)
const worker = template.replace('__BUILD_VERSION__', version).replace('const PRECACHE = __PRECACHE__', `const PRECACHE = ${JSON.stringify(files)}`)
await writeFile('dist/sw.js', worker)
console.log(`Offline bundle ${version}: ${files.length} files`)
