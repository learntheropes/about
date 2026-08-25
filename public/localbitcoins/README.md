# LocalBitcoins — historical volume archive 2013–2023

## Why this archive exists

LocalBitcoins shut down in 2023. Coin.dance, which had kept public volume-by-market statistics since
2013, could disappear any day (server, domain, the maintainer's willingness — none of it is up to us).
When that happens, this piece of Bitcoin history — the era when P2P was the main way to buy it in
dozens of countries — risks becoming unrecoverable anywhere.

This folder is therefore an **archive**, kept on GitHub specifically so it stays readable and citable
even after the original source is gone.

## Transparency about the source

All the CSVs in here are **public data**, downloaded from [coin.dance](https://coin.dance/volume/localbitcoins).
It's not internal data, not proprietary data, and doesn't come from any privileged access: as long as the
site stays online, anyone can go verify the same number on the same page. We say this explicitly because
whoever cites these numbers should be able to trace them back to the original source in one click — that's
how you build a reputation by doing things honestly.

## How it was obtained

The script `scripts/fetch_lbc_volumes.py` (repo root) does all the work:

1. For each market (47 currencies, listed in `CODES` inside the script) it downloads the page
   `coin.dance/volume/localbitcoins/<CURRENCY>`.
2. Each page contains, embedded in the HTML, **two datasets** for the chart (FusionCharts): the first is
   always the weekly volume in **BTC**, the second the same volume in **local currency**. No interaction
   with the "Download CSV" button and no reading of the Network tab: both datasets are already in the
   HTML response.
3. The two series are written to two separate CSVs — never mixed in the same file (see below).
4. Venezuela is a special case, see the dedicated section.

To re-run the download and overwrite everything with fresh data (as long as coin.dance still exists):

```bash
python3 scripts/fetch_lbc_volumes.py
```

## Folder structure

```
public/localbitcoins/
├── coin-dance-localbitcoins-<CURRENCY>-volume.csv   ← volume in BTC (47 files)
├── coin-dance-localbitcoins-VED+VEF-volume.csv      ← Venezuela BTC, merged series 2013–2023
├── coin-dance-localbitcoins-ALL-volume.csv          ← global total
└── local/
    └── coin-dance-localbitcoins-<CURRENCY>-volume.csv   ← same volume, in local currency (48 files)
```

**Fixed rule: BTC and local currency are never mixed in the same file.** To compare different markets
always use the root folder (BTC): it's the only unit that's actually comparable across countries, because
the local-currency value of two different markets isn't comparable without a historical exchange rate.

## Coverage per market

Range of weeks actually present in each file (not every market launched at the same time: some start in
2013, others only when LocalBitcoins opened that country).

| Country | Currency | BTC range (weeks) | Local currency range (weeks) |
|---|---|---|---|
| Saudi Arabia | SAR | 2014-01-11 → 2023-02-18 (448) | 2014-01-11 → 2023-02-18 (448) |
| Argentina | ARS | 2013-04-20 → 2023-02-18 (513) | 2013-04-20 → 2023-02-18 (513) |
| Australia | AUD | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Brazil | BRL | 2013-03-23 → 2023-02-18 (509) | 2013-03-23 → 2023-02-18 (509) |
| Canada | CAD | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Chile | CLP | 2013-08-17 → 2023-02-18 (492) | 2013-08-17 → 2023-02-18 (492) |
| China | CNY | 2013-08-24 → 2023-02-18 (490) | 2013-08-24 → 2023-02-18 (490) |
| Colombia | COP | 2013-07-13 → 2023-02-18 (492) | 2013-07-13 → 2023-02-18 (492) |
| South Korea | KRW | 2013-08-10 → 2023-02-18 (426) | 2013-08-10 → 2023-02-18 (426) |
| Croatia | HRK | 2013-04-13 → 2022-08-20 (462) | 2013-04-13 → 2022-08-20 (462) |
| Denmark | DKK | 2013-04-20 → 2023-02-18 (485) | 2013-04-20 → 2023-02-18 (485) |
| Egypt | EGP | 2013-11-02 → 2023-02-18 (338) | 2013-11-02 → 2023-02-18 (338) |
| United Arab Emirates | AED | 2013-06-29 → 2023-02-18 (482) | 2013-06-29 → 2023-02-18 (482) |
| Europe | EUR | 2013-03-16 → 2023-03-04 (521) | 2013-03-16 → 2023-03-04 (521) |
| Philippines | PHP | 2013-03-30 → 2023-02-18 (512) | 2013-03-30 → 2023-02-18 (512) |
| Japan | JPY | 2013-08-10 → 2023-02-18 (473) | 2013-08-10 → 2023-02-18 (473) |
| Hong Kong | HKD | 2013-04-06 → 2023-02-18 (514) | 2013-04-06 → 2023-02-18 (514) |
| India | INR | 2013-03-23 → 2023-02-18 (517) | 2013-03-23 → 2023-02-18 (517) |
| Indonesia | IDR | 2013-05-18 → 2023-02-18 (417) | 2013-05-18 → 2023-02-18 (417) |
| Iran | IRR | 2014-01-11 → 2021-04-17 (336) | 2014-01-11 → 2021-04-17 (336) |
| Kazakhstan | KZT | 2014-11-22 → 2023-02-18 (380) | 2014-11-22 → 2023-02-18 (380) |
| Kenya | KES | 2013-11-23 → 2023-02-18 (480) | 2013-11-23 → 2023-02-18 (480) |
| Malaysia | MYR | 2013-06-29 → 2023-02-18 (495) | 2013-06-29 → 2023-02-18 (495) |
| Morocco | MAD | 2013-11-30 → 2023-02-18 (374) | 2013-11-30 → 2023-02-18 (374) |
| Mexico | MXN | 2013-03-16 → 2023-02-18 (516) | 2013-03-16 → 2023-02-18 (516) |
| Nigeria | NGN | 2013-09-14 → 2023-02-18 (457) | 2013-09-14 → 2023-02-18 (457) |
| Norway | NOK | 2013-03-16 → 2023-02-18 (518) | 2013-03-16 → 2023-02-18 (518) |
| New Zealand | NZD | 2013-03-16 → 2023-02-18 (515) | 2013-03-16 → 2023-02-18 (515) |
| Pakistan | PKR | 2014-03-01 → 2023-02-18 (422) | 2014-03-01 → 2023-02-18 (422) |
| Peru | PEN | 2014-02-22 → 2023-02-18 (464) | 2014-02-22 → 2023-02-18 (464) |
| Poland | PLN | 2013-06-29 → 2023-02-18 (502) | 2013-06-29 → 2023-02-18 (502) |
| United Kingdom | GBP | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Czech Republic | CZK | 2013-04-13 → 2023-02-18 (513) | 2013-04-13 → 2023-02-18 (513) |
| Dominican Republic | DOP | 2014-02-08 → 2023-02-18 (380) | 2014-02-08 → 2023-02-18 (380) |
| Romania | RON | 2013-03-16 → 2023-02-18 (515) | 2013-03-16 → 2023-02-18 (515) |
| Russia | RUB | 2013-03-30 → 2023-02-18 (503) | 2013-03-30 → 2023-02-18 (503) |
| Singapore | SGD | 2013-03-23 → 2023-02-18 (502) | 2013-03-23 → 2023-02-18 (502) |
| South Africa | ZAR | 2013-05-25 → 2023-02-18 (509) | 2013-05-25 → 2023-02-18 (509) |
| Sweden | SEK | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Switzerland | CHF | 2013-04-06 → 2023-02-18 (511) | 2013-04-06 → 2023-02-18 (511) |
| Tanzania | TZS | 2015-02-21 → 2023-02-18 (394) | 2015-02-21 → 2023-02-18 (394) |
| Thailand | THB | 2013-03-30 → 2023-02-18 (516) | 2013-03-30 → 2023-02-18 (516) |
| Turkey | TRY | 2013-08-31 → 2023-02-18 (465) | 2013-08-31 → 2023-02-18 (465) |
| USA | USD | 2013-03-16 → 2023-02-25 (520) | 2013-03-16 → 2023-02-25 (520) |
| Ukraine | UAH | 2013-08-24 → 2023-02-18 (448) | 2013-08-24 → 2023-02-18 (448) |
| Hungary | HUF | 2013-08-17 → 2023-02-18 (496) | 2013-08-17 → 2023-02-18 (496) |
| Vietnam | VND | 2014-02-15 → 2023-02-18 (409) | 2014-02-15 → 2023-02-18 (409) |
| Venezuela | VEF+VED | 2013-10-12 → 2023-02-18 (464) | 2018-08-25 → 2023-02-18 (235), VED only |

## Note on Venezuela: the VEF → VED switch

On August 20, 2018 Venezuela replaced the bolívar fuerte (VEF) with the bolívar soberano (VED), cutting
5 zeros (exchange rate 1 VED = 100,000 VEF). This shows up clearly in the data:

- **Last week in VEF**: 2018-06-16
- **Gap in the series**: 2018-06-17 → 2018-08-24 (~9 weeks with no data in either currency — matching
  the actual redenomination date, August 20, 2018)
- **First week in VED**: 2018-08-25

So:

- `coin-dance-localbitcoins-VED+VEF-volume.csv` (root, **BTC**): covers 2013-10-12 → 2023-02-18 with no
  gaps, VEF and VED merged — because in BTC the two eras are the exact same unit of measure, so merging
  them is correct and lossless.
- `local/coin-dance-localbitcoins-VED-volume.csv` (**local currency**): only covers from 2018-08-25. The
  pre-2018 local VEF is no longer recoverable from the current site, and even if it were, it shouldn't be
  merged with VED without applying the 1:100,000 factor — otherwise the chart would show a 5-order-of-
  magnitude drop that's just a unit change, not an actual volume collapse.

## Known limitations

- Snapshot at download time, not a live feed: coin.dance updates weekly, these CSVs don't.
- The script doesn't do retries or sophisticated error handling: if one market fails, the others still
  proceed (an OK/FAILED summary is printed at the end of the run).
