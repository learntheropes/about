// Minimal CSV parser: no embedded commas/newlines within fields in our sources,
// so a per-line split is enough — swap for a real parser (e.g. papaparse) if that changes.
export const parseCsv = (text) => {
  const lines = text.split(/\r?\n/).filter(Boolean)
  const header = lines[0].split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map((line) => {
    const cells = line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''))
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]))
  })
}
