import { parseCsv } from './csv'

// coin.dance's LocalBitcoins weekly volume export is available both in BTC
// and in native fiat per market (see public/localbitcoins/README.md); these
// CSVs at the public/localbitcoins/ root are all BTC, so every market here is
// directly comparable.
export const allMarkets = [
  { code: 'ARS', label: 'ARS' },
  { code: 'AUD', label: 'AUD' },
  { code: 'BRL', label: 'BRL' },
  { code: 'CAD', label: 'CAD' },
  { code: 'CLP', label: 'CLP' },
  { code: 'CNY', label: 'CNY' },
  { code: 'COP', label: 'COP' },
  { code: 'HRK', label: 'HRK' },
  { code: 'CZK', label: 'CZK' },
  { code: 'DKK', label: 'DKK' },
  { code: 'DOP', label: 'DOP' },
  { code: 'EGP', label: 'EGP' },
  { code: 'EUR', label: 'EUR' },
  { code: 'HKD', label: 'HKD' },
  { code: 'HUF', label: 'HUF' },
  { code: 'INR', label: 'INR' },
  { code: 'IDR', label: 'IDR' },
  { code: 'IRR', label: 'IRR' },
  { code: 'JPY', label: 'JPY' },
  { code: 'KZT', label: 'KZT' },
  { code: 'KES', label: 'KES' },
  { code: 'MYR', label: 'MYR' },
  { code: 'MXN', label: 'MXN' },
  { code: 'MAD', label: 'MAD' },
  { code: 'NZD', label: 'NZD' },
  { code: 'NGN', label: 'NGN' },
  { code: 'NOK', label: 'NOK' },
  { code: 'PKR', label: 'PKR' },
  { code: 'PEN', label: 'PEN' },
  { code: 'PHP', label: 'PHP' },
  { code: 'PLN', label: 'PLN' },
  { code: 'RON', label: 'RON' },
  { code: 'RUB', label: 'RUB' },
  { code: 'SAR', label: 'SAR' },
  { code: 'SGD', label: 'SGD' },
  { code: 'ZAR', label: 'ZAR' },
  { code: 'KRW', label: 'KRW' },
  { code: 'SEK', label: 'SEK' },
  { code: 'CHF', label: 'CHF' },
  { code: 'TZS', label: 'TZS' },
  { code: 'THB', label: 'THB' },
  { code: 'TRY', label: 'TRY' },
  { code: 'UAH', label: 'UAH' },
  { code: 'AED', label: 'AED' },
  { code: 'GBP', label: 'GBP' },
  { code: 'USD', label: 'USD' },
  { code: 'VED+VEF', label: 'VES' },
  { code: 'VND', label: 'VND' },
]

const csvUrl = (code) => `/localbitcoins/coin-dance-localbitcoins-${encodeURIComponent(code)}-volume.csv`

// Adapter: turns the coin.dance CSV export into the { id, label, points } shape
// lineChart.vue expects. A future markdown-table source would be a separate
// adapter producing the same shape.
export const loadLocalbitcoinsVolume = async (markets = allMarkets) => {
  const rows = await Promise.all(
    markets.map(async ({ code, label }) => {
      const res = await fetch(csvUrl(code))
      const text = await res.text()
      const points = parseCsv(text)
        .map((row) => ({ x: row.Label, y: parseFloat(row.Value) }))
        .filter((point) => Number.isFinite(point.y))
      return { id: code, label, points }
    })
  )

  return rows
}
