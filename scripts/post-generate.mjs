import fs from 'node:fs'
import path from 'node:path'

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function main() {
  const outDir = path.resolve(process.cwd(), '.output/public')

  ensureDir(outDir)

  // GitHub Pages SPA fallback, only if nitro didn't already prerender a real index.html
  const html200 = path.join(outDir, '200.html')
  const indexHtml = path.join(outDir, 'index.html')

  if (!fs.existsSync(indexHtml) && fs.existsSync(html200)) {
    fs.copyFileSync(html200, indexHtml)
  }

  // Disable Jekyll processing
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
}

main()
