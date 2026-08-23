import fs from 'node:fs'
import path from 'node:path'

// GitHub Pages runs Jekyll by default, which ignores _-prefixed dirs (_nuxt, _i18n, __nuxt_content)
fs.writeFileSync(path.resolve(process.cwd(), '.output/public/.nojekyll'), '')
