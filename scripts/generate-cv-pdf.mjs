import { mdToPdf } from 'md-to-pdf'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = `${root}content/en/cv.md`
const dest = `${root}public/glpy-cv.pdf`

// #todo/#done lines are authoring notes for humans/AI, not CV content — the
// rest prints as-is, including the manual &nbsp; spacing used for page breaks.
const content = readFileSync(source, 'utf8')
  .split('\n')
  .filter((line) => !/^#(todo|done)\b/.test(line.trimStart()))
  .join('\n')

const css = `
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #1a1a1a;
    line-height: 1.5;
  }
  h1 { color: #f7931a; border-bottom: 2px solid #f7931a; padding-bottom: 4px; }
  h2 { color: #f7931a; margin-top: 1.5em; }
  h3 { margin-bottom: 0.2em; }
  a { color: #f7931a; }
  hr { border: none; border-top: 1px solid #ddd; margin: 1.5em 0; }
`

await mdToPdf(
  { content },
  {
    dest,
    css,
    pdf_options: {
      format: 'A4',
      margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' },
      printBackground: true,
    },
    launch_options: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
  }
)

console.log(`Wrote ${dest}`)
