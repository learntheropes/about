# LocalBitcoins — memoria storica dei volumi 2013–2023

## Perché questo archivio esiste

LocalBitcoins ha chiuso nel 2023. Coin.dance, che ne teneva le statistiche pubbliche di volume per mercato
nazionale dal 2013, potrebbe sparire da un giorno all'altro (server, dominio, volontà del gestore — non
dipende da noi). Quando succederà, questo pezzo di storia di Bitcoin — la fase in cui il P2P era il modo
principale per comprarlo in decine di paesi — rischia di non essere più recuperabile da nessuna parte.

Questa cartella è quindi un **archivio**, tenuto su GitHub apposta perché resti leggibile e citabile anche
dopo che la fonte originale sarà sparita.

## Trasparenza sulla fonte

Tutti i CSV qui dentro sono **dati pubblici**, scaricati da [coin.dance](https://coin.dance/volume/localbitcoins).
Non è dato interno, non è dato proprietario, non deriva da nessun accesso privilegiato: fino a quando il sito
resterà online, chiunque può andare a verificare lo stesso numero sulla stessa pagina. Lo diciamo esplicitamente
perché chi cita questi numeri deve poter risalire alla fonte originale in un clic — è così che ci si fa
pubblicità facendo le cose oneste.

## Come sono stati ottenuti

Lo script `scripts/fetch_lbc_volumes.py` (root del repo) fa tutto il lavoro:

1. Per ciascun mercato (47 valute, elenco in `CODES` dentro lo script) scarica la pagina
   `coin.dance/volume/localbitcoins/<VALUTA>`.
2. Ogni pagina contiene, incorporati nell'HTML, **due dataset** del grafico (FusionCharts): il primo è sempre il
   volume settimanale in **BTC**, il secondo lo stesso volume in **valuta locale**. Nessuna interazione col
   pulsante "Download CSV" né lettura del tab Network: i due dataset sono già nella risposta HTML.
3. Le due serie vengono scritte in due CSV separati — mai mescolate nello stesso file (vedi sotto).
4. Il Venezuela è un caso a parte, vedi sezione dedicata.

Per rilanciare il download e sovrascrivere tutto con dati freschi (finché coin.dance esiste ancora):

```bash
python3 scripts/fetch_lbc_volumes.py
```

## Struttura delle cartelle

```
public/localbitcoins/
├── coin-dance-localbitcoins-<VALUTA>-volume.csv   ← volume in BTC (47 file)
├── coin-dance-localbitcoins-VED+VEF-volume.csv    ← Venezuela BTC, serie unita 2013–2023
├── coin-dance-localbitcoins-ALL-volume.csv        ← totale globale
└── local/
    └── coin-dance-localbitcoins-<VALUTA>-volume.csv   ← stesso volume, in valuta locale (48 file)
```

**Regola fissa: BTC e valuta locale non si mescolano mai nello stesso file.** Per confrontare mercati diversi
usare sempre la cartella radice (BTC): è l'unica unità realmente comparabile tra paesi, perché il valore in
valuta locale di due mercati diversi non è confrontabile senza un tasso di cambio storico.

## Copertura per mercato

Range di settimane effettivamente presenti in ciascun file (non tutti i mercati sono nati insieme: alcuni
partono nel 2013, altri solo quando LocalBitcoins ha aperto quel paese).

| Paese | Valuta | Range BTC (settimane) | Range valuta locale (settimane) |
|---|---|---|---|
| Arabia Saudita | SAR | 2014-01-11 → 2023-02-18 (448) | 2014-01-11 → 2023-02-18 (448) |
| Argentina | ARS | 2013-04-20 → 2023-02-18 (513) | 2013-04-20 → 2023-02-18 (513) |
| Australia | AUD | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Brasile | BRL | 2013-03-23 → 2023-02-18 (509) | 2013-03-23 → 2023-02-18 (509) |
| Canada | CAD | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Cile | CLP | 2013-08-17 → 2023-02-18 (492) | 2013-08-17 → 2023-02-18 (492) |
| Cina | CNY | 2013-08-24 → 2023-02-18 (490) | 2013-08-24 → 2023-02-18 (490) |
| Colombia | COP | 2013-07-13 → 2023-02-18 (492) | 2013-07-13 → 2023-02-18 (492) |
| Corea del Sud | KRW | 2013-08-10 → 2023-02-18 (426) | 2013-08-10 → 2023-02-18 (426) |
| Croazia | HRK | 2013-04-13 → 2022-08-20 (462) | 2013-04-13 → 2022-08-20 (462) |
| Danimarca | DKK | 2013-04-20 → 2023-02-18 (485) | 2013-04-20 → 2023-02-18 (485) |
| Egitto | EGP | 2013-11-02 → 2023-02-18 (338) | 2013-11-02 → 2023-02-18 (338) |
| Emirati Arabi Uniti | AED | 2013-06-29 → 2023-02-18 (482) | 2013-06-29 → 2023-02-18 (482) |
| Europa | EUR | 2013-03-16 → 2023-03-04 (521) | 2013-03-16 → 2023-03-04 (521) |
| Filippine | PHP | 2013-03-30 → 2023-02-18 (512) | 2013-03-30 → 2023-02-18 (512) |
| Giappone | JPY | 2013-08-10 → 2023-02-18 (473) | 2013-08-10 → 2023-02-18 (473) |
| Hong Kong | HKD | 2013-04-06 → 2023-02-18 (514) | 2013-04-06 → 2023-02-18 (514) |
| India | INR | 2013-03-23 → 2023-02-18 (517) | 2013-03-23 → 2023-02-18 (517) |
| Indonesia | IDR | 2013-05-18 → 2023-02-18 (417) | 2013-05-18 → 2023-02-18 (417) |
| Iran | IRR | 2014-01-11 → 2021-04-17 (336) | 2014-01-11 → 2021-04-17 (336) |
| Kazakistan | KZT | 2014-11-22 → 2023-02-18 (380) | 2014-11-22 → 2023-02-18 (380) |
| Kenya | KES | 2013-11-23 → 2023-02-18 (480) | 2013-11-23 → 2023-02-18 (480) |
| Malesia | MYR | 2013-06-29 → 2023-02-18 (495) | 2013-06-29 → 2023-02-18 (495) |
| Marocco | MAD | 2013-11-30 → 2023-02-18 (374) | 2013-11-30 → 2023-02-18 (374) |
| Messico | MXN | 2013-03-16 → 2023-02-18 (516) | 2013-03-16 → 2023-02-18 (516) |
| Nigeria | NGN | 2013-09-14 → 2023-02-18 (457) | 2013-09-14 → 2023-02-18 (457) |
| Norvegia | NOK | 2013-03-16 → 2023-02-18 (518) | 2013-03-16 → 2023-02-18 (518) |
| Nuova Zelanda | NZD | 2013-03-16 → 2023-02-18 (515) | 2013-03-16 → 2023-02-18 (515) |
| Pakistan | PKR | 2014-03-01 → 2023-02-18 (422) | 2014-03-01 → 2023-02-18 (422) |
| Perù | PEN | 2014-02-22 → 2023-02-18 (464) | 2014-02-22 → 2023-02-18 (464) |
| Polonia | PLN | 2013-06-29 → 2023-02-18 (502) | 2013-06-29 → 2023-02-18 (502) |
| Regno Unito | GBP | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Rep. Ceca | CZK | 2013-04-13 → 2023-02-18 (513) | 2013-04-13 → 2023-02-18 (513) |
| Rep. Dominicana | DOP | 2014-02-08 → 2023-02-18 (380) | 2014-02-08 → 2023-02-18 (380) |
| Romania | RON | 2013-03-16 → 2023-02-18 (515) | 2013-03-16 → 2023-02-18 (515) |
| Russia | RUB | 2013-03-30 → 2023-02-18 (503) | 2013-03-30 → 2023-02-18 (503) |
| Singapore | SGD | 2013-03-23 → 2023-02-18 (502) | 2013-03-23 → 2023-02-18 (502) |
| Sudafrica | ZAR | 2013-05-25 → 2023-02-18 (509) | 2013-05-25 → 2023-02-18 (509) |
| Svezia | SEK | 2013-03-16 → 2023-02-18 (519) | 2013-03-16 → 2023-02-18 (519) |
| Svizzera | CHF | 2013-04-06 → 2023-02-18 (511) | 2013-04-06 → 2023-02-18 (511) |
| Tanzania | TZS | 2015-02-21 → 2023-02-18 (394) | 2015-02-21 → 2023-02-18 (394) |
| Thailandia | THB | 2013-03-30 → 2023-02-18 (516) | 2013-03-30 → 2023-02-18 (516) |
| Turchia | TRY | 2013-08-31 → 2023-02-18 (465) | 2013-08-31 → 2023-02-18 (465) |
| USA | USD | 2013-03-16 → 2023-02-25 (520) | 2013-03-16 → 2023-02-25 (520) |
| Ucraina | UAH | 2013-08-24 → 2023-02-18 (448) | 2013-08-24 → 2023-02-18 (448) |
| Ungheria | HUF | 2013-08-17 → 2023-02-18 (496) | 2013-08-17 → 2023-02-18 (496) |
| Vietnam | VND | 2014-02-15 → 2023-02-18 (409) | 2014-02-15 → 2023-02-18 (409) |
| Venezuela | VEF+VED | 2013-10-12 → 2023-02-18 (464) | 2018-08-25 → 2023-02-18 (235), solo VED |

## Nota sul Venezuela: lo switch VEF → VED

Il 20 agosto 2018 il Venezuela ha sostituito il bolívar fuerte (VEF) con il bolívar soberano (VED), tagliando
5 zeri (cambio 1 VED = 100.000 VEF). Nei dati questo si vede chiaramente:

- **Ultima settimana in VEF**: 2018-06-16
- **Vuoto nella serie**: 2018-06-17 → 2018-08-24 (~9 settimane senza dati su nessuna delle due valute — combacia
  con la data reale della ridenominazione, il 20 agosto 2018)
- **Prima settimana in VED**: 2018-08-25

Quindi:

- `coin-dance-localbitcoins-VED+VEF-volume.csv` (radice, **BTC**): copre 2013-10-12 → 2023-02-18 senza
  interruzioni, VEF e VED uniti — perché in BTC le due epoche sono la stessa identica unità di misura, unirle
  è corretto e senza perdita.
- `local/coin-dance-localbitcoins-VED-volume.csv` (**valuta locale**): copre solo da 2018-08-25. Il VEF locale
  pre-2018 non è più recuperabile dal sito attuale, e anche se lo fosse non andrebbe unito al VED senza
  applicare il fattore 1:100.000 — altrimenti il grafico mostrerebbe un crollo di 5 ordini di grandezza che è
  solo un cambio di unità, non un crollo di volume reale.

## Limiti noti

- Snapshot al momento del download, non un feed live: coin.dance aggiorna settimanalmente, questi CSV no.
- Lo script non fa retry né gestione errori sofisticata: se un mercato fallisce, gli altri proseguono comunque
  (riepilogo OK/FALLITI stampato a fine esecuzione).
