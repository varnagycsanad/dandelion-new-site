[CHANGE 2026-04-26 00:00] D2 galéria megtartási és ritkítási review dokumentum létrehozása.

# D2 galéria selection review

Ez belső döntési dokumentum.
Nem frontend adatforrás.
Nem töröl képet.
Nem módosítja a registryt.
Cél: eldönteni, mely képek legyenek aktívak a végleges D2 galériában.

## Javasolt aktív galéria

| Új sorrend | Source ID | Téma | Státusz | Megjegyzés |
|---:|---|---|---|---|
| 1 | d2-source-gallery-01 | nappali + teraszkapcsolat | proposed_active | Erős belső nyitókép, mutatja a nappalit, kandallót és a teraszkapcsolatot. |
| 2 | d2-source-gallery-04 | fedett terasz | proposed_active | Fontos kültéri használati kép, a sárga étkezőasztal jól azonosítható. |
| 3 | d2-source-gallery-05 | fürdőszoba | proposed_active | Világos fürdőszobakép káddal és mosdóval. |
| 4 | d2-source-gallery-07 | franciaágyas hálószoba | proposed_active | Fontos hálószoba kép, önálló tartalmi szereppel. |
| 5 | d2-source-gallery-09 | konyha + galériás tér | proposed_active | Egyszerre mutatja a konyhát, étkezőt és a galériás belső teret. |
| 6 | d2-source-gallery-10 | konyha részlet | proposed_active | Külön praktikus konyha-részlet, nem ugyanazt mondja el, mint a gallery-09. |
| 7 | d2-source-gallery-11 | emeleti galériás hálószoba | proposed_active | Fontos D2 sajátosság, mutatja a galériaszinten lévő kétágyas hálórészt. |
| 8 | d2-source-gallery-13 | nappali kilátással | proposed_active | Kiegészítő nappali hangulatkép, külön értéke a kilátás. |
| 9 | d2-source-gallery-14 | külső terasz / kert | proposed_active | Erős külső kép, megtartható a terasz/kert bemutatására. |
| 10 | d2-source-gallery-16 | fürdőszoba másik nézet | proposed_active | Második fürdőszobanézet, döntés előtt ellenőrizhető, kell-e mindkét fürdő kép. |

## Javasolt kihagyás / tartalék

| Source ID | Téma | Státusz | Ok | Megjegyzés |
|---|---|---|---|---|
| d2-source-gallery-02 | nappali / kandalló | proposed_hidden | Hasonló a gallery-01-hez. | Nem törlendő, csak nem aktív galéria első körben. |
| d2-source-gallery-03 | galériás belső tér | proposed_hidden | Ferde belső nézet, gyengébb kompozíció. | Nem törlendő, csak nem aktív galéria első körben. |
| d2-source-gallery-06 | nappali / kandalló / terasz | proposed_hidden | Nagyon hasonló a gallery-01-hez. | Nem törlendő, csak nem aktív galéria első körben. |
| d2-source-gallery-08 | fedett terasz / kert | proposed_hidden | Nagyon hasonló a gallery-04-hez. | Nem törlendő, csak nem aktív galéria első körben. |
| d2-source-gallery-12 | külső / fedett terasz / kert | proposed_hidden | Hasonló külső/terasz kép. | Nem törlendő, csak nem aktív galéria első körben. |
| d2-source-gallery-15 | külső / vendégház / terasz | proposed_hidden | Azonos vagy nagyon közeli a desktop hero képhez. | Nem törlendő, csak nem aktív galéria első körben. |

## Külön szerepképek

- A mobil hero marad külön `hero_mobile` szerepben.
- A desktop hero marad külön `hero_desktop` szerepben.
- A card kép marad külön `card` szerepben.
- Ezek nem számítanak bele az aktív galéria 10 képébe.

## Nyitott döntések

- User jóváhagyja-e a 10 képes aktív galériát.
- Kell-e 12 kép, vagy maradjon 10.
- Gallery-02 vagy gallery-06 jobb-e alternatív nappali képnek.
- Gallery-04 vagy gallery-08 jobb-e terasz képnek.
- Gallery-05 és gallery-16 közül kell-e mindkét fürdő kép.
- Kell-e külön külső hero ismétlés galériába.
