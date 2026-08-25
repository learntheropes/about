#!/usr/bin/env python3
"""Scarica da coin.dance, per ogni mercato LocalBitcoins, sia la serie in BTC
sia la serie in valuta locale (embedded nella pagina, due dataset FusionCharts),
tenendole in due cartelle separate. Nessun mix BTC/locale nello stesso file.
"""
import re
import time
import urllib.request
from pathlib import Path

BASE = Path(__file__).parent.parent / "public" / "localbitcoins"
LOCAL_DIR = BASE / "local"
LOCAL_DIR.mkdir(exist_ok=True)

# Venezuela BTC gestito a parte: il file gia' mergiato (VEF 2013-10 + VED 2018-08)
# fornito dall'utente resta l'unica fonte per la serie BTC, non si rifà il fetch.
VENEZUELA_BTC_FILE = BASE / "coin-dance-localbitcoins-VED+VEF-volume.csv"

CODES = [
    "ARS", "AUD", "BRL", "CAD", "CLP", "CNY", "COP", "HRK", "CZK", "DKK",
    "DOP", "EGP", "EUR", "HKD", "HUF", "INR", "IDR", "IRR", "JPY", "KZT",
    "KES", "MYR", "MXN", "MAD", "NZD", "NGN", "NOK", "PKR", "PEN", "PHP",
    "PLN", "RON", "RUB", "SAR", "SGD", "ZAR", "KRW", "SEK", "CHF", "TZS",
    "THB", "TRY", "UAH", "AED", "GBP", "USD", "VND",
]
VED_ONLY = "VED"  # solo serie locale (bolivar soberano, dal 2018-08): niente fetch BTC

ROW_RE = re.compile(r'"label":"([^"]+)","value":"([^"]+)"')


def fetch(code):
    url = f"https://coin.dance/volume/localbitcoins/{code}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", errors="replace")


def extract_two_series(html):
    idxs = [m.start() for m in re.finditer(r'"data":\[', html)]
    if len(idxs) < 2:
        return None, None
    seg1 = html[idxs[0]:idxs[1]]
    seg2 = html[idxs[1]:idxs[1] + 500_000]
    rows1 = ROW_RE.findall(seg1)
    rows2 = ROW_RE.findall(seg2)
    return rows1, rows2


def write_csv(path, rows):
    with open(path, "w") as f:
        f.write("Label,Value\n")
        for label, value in rows:
            f.write(f"{label},{value}\n")


def main():
    ok, failed = [], []
    for code in CODES:
        try:
            html = fetch(code)
            btc_rows, local_rows = extract_two_series(html)
            if not btc_rows or not local_rows:
                failed.append((code, "no dataset found"))
                continue
            write_csv(BASE / f"coin-dance-localbitcoins-{code}-volume.csv", btc_rows)
            write_csv(LOCAL_DIR / f"coin-dance-localbitcoins-{code}-volume.csv", local_rows)
            ok.append((code, len(btc_rows), len(local_rows)))
            print(f"{code}: btc={len(btc_rows)} local={len(local_rows)}")
        except Exception as e:
            failed.append((code, str(e)))
            print(f"{code}: ERRORE {e}")
        time.sleep(0.3)  # ponytail: rate-limit gentile, no bisogno di retry/backoff per 48 richieste

    # Venezuela: BTC = file gia' mergiato dall'utente (non si tocca), locale = solo VED dal sito
    try:
        html = fetch(VED_ONLY)
        _, ved_local_rows = extract_two_series(html)
        if ved_local_rows:
            write_csv(LOCAL_DIR / "coin-dance-localbitcoins-VED-volume.csv", ved_local_rows)
            ok.append(("VED (local only)", 0, len(ved_local_rows)))
            print(f"VED: local={len(ved_local_rows)} (solo dal 2018-08-25, VEF pre-2018 non fetchabile dal sito)")
        else:
            failed.append(("VED", "no local dataset"))
    except Exception as e:
        failed.append(("VED", str(e)))

    if VENEZUELA_BTC_FILE.exists():
        print(f"Venezuela BTC: uso il file gia' presente {VENEZUELA_BTC_FILE.name} (non sovrascritto)")
    else:
        failed.append(("VED+VEF btc", "file mergiato mancante, previsto da te"))

    print(f"\nOK: {len(ok)}/{len(CODES)+1}  FALLITI: {len(failed)}")
    if failed:
        for code, err in failed:
            print(f"  - {code}: {err}")


if __name__ == "__main__":
    main()
