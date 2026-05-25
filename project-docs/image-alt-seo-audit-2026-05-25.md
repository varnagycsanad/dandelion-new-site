# Dandelion kep ALT SEO audit - HU/DE/CS

Datum: 2026-05-25

## Scope

Audit a buildelt `dist` HTML alapjan, kulon figyelemmel a nemet (`/de/`) es cseh (`/cs/`) oldalak kep ALT mezoire. A vizsgalat az osszes `<img>` elemet nezte, nem csak a forraskodban szereplo komponenseket.

Ellenorzott build:

```bash
npm run build
```

Eredmeny: sikeres build, 89 oldal.

## Osszkep

| Nyelv | Oldalak | Kepek | Hianyzo alt attrib. | Ures alt | Generikus / ures ALT |
| --- | ---: | ---: | ---: | ---: | ---: |
| HU | 23 | 412 | 0 | 11 | 92 |
| EN | 21 | 342 | 0 | 9 | 74 |
| DE | 21 | 292 | 0 | 9 | 73 |
| CS | 17 | 282 | 0 | 9 | 81 |

Pozitivum: technikailag nincs olyan kep, amelyrol teljesen hianyzik az `alt` attribum.

Fo gond: a nemet es cseh szallasoldalak galeria ALT-jai jelentos reszben nem valodi, leiro, lokalizalt SEO szovegek. Sok helyen sorszamos vagy angol fallback jelenik meg.

## Kritikus megallapitasok

### 1. Nemet szallas-galeriak: tobbnyire angol fallback vagy generikus ALT

Pelda buildelt kimenetbol:

- `/de/dandelion-d1/` - `Dandelion D1 gallery 001`
- `/de/dandelion-fugehaz/` - `Fugehaz gallery 001`
- `/de/dandelion-koveskal/` - `Dandelion Koveskal gallery 001`
- `/de/royal/` - `Royal Homes gallery 022`
- `/de/szepvolgyi/` - `Szepvolgyi gallery 001`
- `/de/dandelion-d2/` - `Covered terrace with yellow chairs and garden at Dandelion D2 in Kisapati`
- `/de/dandelion-d2/` - `Living room and kitchen in Dandelion D2 apartment`

SEO hatas: nemet oldalon angol ALT szovegek gyengitik a lokalizacios jelet, a `gallery 001` tipusu ALT pedig kepkereso szempontbol alig ad tematikus informaciot.

### 2. Cseh szallas-galeriak: nem ures, de tul sablonos

Pelda buildelt kimenetbol:

- `/cs/dandelion-d1/` - `Dandelion D1 - galerie ubytovani, fotografie 001`
- `/cs/dandelion-d2/` - `Dandelion D2 - galerie ubytovani, fotografie 001`
- `/cs/dandelion-fugehaz/` - `Dandelion Fugehaz - galerie ubytovani, fotografie 001`
- `/cs/szepvolgyi/` - `Dandelion Szepvolgyi - galerie ubytovani, fotografie 001`

Ez legalabb cseh kontextusu fallback, de SEO szempontbol gyenge, mert nem irja le a kep tartalmat: terasz, kert, nappali, halo, Balaton-panorama, medence, stb.

### 3. A forras registry nem tartalmaz teljes `de` es `cs` ALT keszletet

A kep tipusa mar tamogatja a nemet/cseh mezoket:

- `src/data/images/image-types.ts` - `LocalizedText = { hu, en, de?, cs? }`

A szallas-galeria adapter is nyelv szerint oldja fel az ALT-ot:

- `src/lib/accommodation-page-adapters.ts` - `resolveLocalizedText(value, locale)`
- `src/lib/accommodation-page-adapters.ts` - cseh fallback: `buildCzechImageText(...)`

Viszont a fo registry-ben a legtobb galeria kepnel csak `hu` es `en` van:

- `src/data/images/accommodation-images.ts`

Emiatt:

- DE: nincs `de`, ezert `en` fallback jon ki.
- CS: nincs `cs`, ezert sablonos automatikus cseh fallback jon ki.

### 4. Ures ALT a lightbox placeholder kepeken

Minden DE/CS szallasoldalon van 1 ures ALT:

- class: `d2-lightbox__image`
- `src=""`
- `alt=""`

Ez valoszinuleg JS altal kesobb feltoltott lightbox kep. Ha dekorativ/placeholder allapot, elfogadhato. Ha megnyitott allapotban a kepernyoolvaso vagy Google ezt latja, akkor a JS-nek a megnyitott kep valodi ALT-jat is at kell adnia.

## Oldalankenti nemet/cseh kockazat

### DE

| Oldal | Kepek | Generikus / ures ALT |
| --- | ---: | ---: |
| `/de/dandelion-d1/` | 27 | 9 |
| `/de/dandelion-d2/` | 30 | 1 |
| `/de/dandelion-fugehaz/` | 27 | 9 |
| `/de/dandelion-koveskal/` | 27 | 9 |
| `/de/dandelion-vintage/` | 27 | 9 |
| `/de/dandelion-zsalya/` | 27 | 9 |
| `/de/royal/` | 27 | 9 |
| `/de/szepvolgyi/` | 27 | 9 |
| `/de/szololiget/` | 27 | 9 |

A tobbi nemet oldal ALT szempontbol elfogadhato, de tobb helyen ASCII atiras van (`ue`, `Gyorgy`, `Koveskal`), ami minosegi lokalizacios szempontbol javithato.

### CS

| Oldal | Kepek | Generikus / ures ALT |
| --- | ---: | ---: |
| `/cs/dandelion-d1/` | 27 | 9 |
| `/cs/dandelion-d2/` | 27 | 9 |
| `/cs/dandelion-fugehaz/` | 27 | 9 |
| `/cs/dandelion-koveskal/` | 27 | 9 |
| `/cs/dandelion-vintage/` | 27 | 9 |
| `/cs/dandelion-zsalya/` | 27 | 9 |
| `/cs/royal/` | 27 | 9 |
| `/cs/szepvolgyi/` | 27 | 9 |
| `/cs/szololiget/` | 27 | 9 |

A cseh fo oldal es elmeny oldalak kep ALT-jai alapvetoen rendben vannak, de sok szoveg diakritika nelkuli. SEO-ban ez nem katasztrofa, de hiteles lokalizaciohoz jobb lenne cseh ekezetekkel.

## Prioritasos javitasi terv

### P1 - Nemet/cseh szallas-galeriak valodi ALT szovegei

Cel: a `src/data/images/accommodation-images.ts` galeria kepei kapjanak `de` es `cs` mezot.

Javasolt minta:

```ts
alt: {
  hu: "Dandelion D2 fedett terasz sarga szekekkel es asztallal",
  en: "Dandelion D2 covered terrace with yellow chairs and table",
  de: "Uberdachte Terrasse des Dandelion D2 mit gelben Stuehlen und Esstisch",
  cs: "Kryta terasa Dandelion D2 se zlutymi zidlemi a stolem"
}
```

Fontos: ne legyen `gallery 001`, `fotografie 001`, `image 001`, hacsak a kep tenyleg csak technikai indexkent jelenik meg. Inkabb: helyszin + tartalom + konkret feature.

### P2 - Lightbox ALT atadas ellenorzese

Az ures `d2-lightbox__image` placeholder lehet rendben, de a megnyitott allapotban a scriptnek a kivalasztott kep ALT-jat kell hasznalnia. Ellenorizni kell, hogy a lightbox JS frissiti-e az `alt` attribumot.

### P3 - Panorama Pool nemet oldal

`/de/panorama-pool/` jelenleg angol `altEn` mezoket hasznal a pool kepekre. Ezekhez is erdemes `altDe` / `altCs` vagy kozos lokalizalt mezostruktura.

Pelda:

- most: `Panorama Pool on the hillside with blue water, sun loungers and a wide Balaton Uplands panorama.`
- jobb DE: `Panorama Pool am Hang mit blauem Wasser, Sonnenliegen und weitem Panorama im Balaton-Oberland`

### P4 - Diakritika es nyelvi termeszetesseg

A nemet es cseh szovegek jelenleg sok helyen ASCII-atirassal mennek. Ez technikailag mukodik, de a felhasznaloi bizalom es a lokalizacios minoseg miatt erdemes:

- `Kisapati` -> `Kisapáti`
- `Koveskal` -> `Köveskál`
- `Szent Gyorgy-hegy` -> `Szent György-hegy`
- cseh: `ubytovani`, `prirodni`, `svedecne hory` helyett `ubytování`, `přírodní`, `svědecké hory`
- nemet: ahol nemet kozszavak vannak, inkabb rendes nemet forma: `Gästehaus`, `Überdachte Terrasse`, `Unterkünfte`

## Javasolt ALT strategia

Szallas-galeriaknal minden kep ALT-ja legyen:

1. marka/szallasnev, ha segit a kontextusban;
2. konkret kepi tartalom;
3. fontos keresesi szandek: terasz, kert, panorama, Balaton, halo, nappali, konyha, medence;
4. termeszetes lokalizalt nyelv, nem kulcsszohalmozas.

Rossz:

```text
Dandelion D1 gallery 001
```

Jo:

```text
Dandelion D1 terasza panoramas kilatassal Kisapatiban
Terrasse des Dandelion D1 mit Panoramablick in Kisapati
Terasa Dandelion D1 s panoramatickym vyhledem v Kisapati
```

## Vegso minosites

Technikai ALT lefedettseg: jo.

SEO minoseg magyar/angol oldalon: kozepes, mert sok galeria kep meg generikus.

SEO minoseg nemet oldalon: gyenge-kozepes, mert a szallas-galeriak nagy resze angol fallback.

SEO minoseg cseh oldalon: kozepes alatt, mert van cseh fallback, de tul generikus es nem kepleiro.

Legnagyobb nyereseg: a 9 szallasoldal elso 8-10 galeriakepenek nemet es cseh, valodi leiro ALT kitoltese. Ez gyorsan javitana a lokalizalt kep-SEO-t es a teljes oldal nyelvi konzisztenciajat.
