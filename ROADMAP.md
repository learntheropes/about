# Roadmap

## TODO — switcher universale sui valori in bitcoin

Ovunque nel sito compaia un numero espresso in bitcoin, aggiungere due toggle indipendenti sul valore mostrato:

1. **Unità: BTC ↔ sats.** Puro cambio di scala (×100.000.000), nessun dato esterno necessario.
2. **Epoca: valore all'epoca ↔ valore ad oggi.** Es. "1.67 BTC" (volume di una settimana del 2013) mostrato
   anche come controvalore attuale, convertendo al prezzo BTC/USD (o altra valuta) di oggi invece che a quello
   dell'epoca.

Per il punto 2 **non chiamare un'API prezzo ad ogni render**: usare una tabella prezzi storici pre-calcolata e
committata nel repo (stesso approccio già in uso per il prezzo medio mensile BTC/USD in `build.py` — margine
±10%, sufficiente per dare la scala, non per contabilità), più un unico prezzo "attuale" aggiornato a build
time (o manualmente ogni tanto), non ad ogni page load.

Componente candidato: un piccolo composable/componente Vue condiviso (`useBtcDisplay` o simile) che tutti i
componenti che mostrano un valore in BTC richiamano, così lo switcher si implementa una volta sola e non per
ogni chart/tabella separatamente.
