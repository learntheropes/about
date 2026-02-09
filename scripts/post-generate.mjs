import fs from 'node:fs'
import path from 'node:path'

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function copyFileIfExists(src, dst) {
  if (fs.existsSync(src)) fs.copyFileSync(src, dst)
}

function main() {
  const baseURL = process.env.NUXT_APP_BASE_URL || '/'
  const baseFolder = baseURL.replace(/^\/|\/$/g, '') // "blockchange-nuxthub" or ""
  const outRoot = path.resolve(process.cwd(), '.output/public')

  // If baseURL is /blockchange-nuxthub/ Nuxt may output into .output/public/blockchange-nuxthub
  const outDir = baseFolder ? path.join(outRoot, baseFolder) : outRoot

  ensureDir(outDir)

  // GitHub Pages SPA fallback
  const html200 = path.join(outDir, '200.html')
  const indexHtml = path.join(outDir, 'index.html')

  if (fs.existsSync(html200)) {
    fs.copyFileSync(html200, indexHtml)
  } else if (!fs.existsSync(indexHtml)) {
  }

  // Disable Jekyll processing
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
}

main()
