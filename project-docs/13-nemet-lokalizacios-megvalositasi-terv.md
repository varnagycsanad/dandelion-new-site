# Nemet lokalizacios megvalositasi terv

## Cel

A magyar honlap nemet nyelvu valtozatanak biztonsagos, lepesenkenti bevezetese ugy, hogy csak a mar ellenorzott nemet oldalak legyenek indexelhetok, a hianyzo tartalmak pedig ne vezessenek torott vagy felkesz allapothoz.

## Jelenlegi allapot

- A `/de/`, `/de/unterkuenfte/` es `/de/kontakt/` oldalak letrejottek.
- A regi `/de.astro` placeholder oldal kivezetes alatt van.
- A nemet oldalak canonical, hreflang es sitemap bekotest kaptak.
- A nemet header es footer csak letezo nemet utvonalakra mutat.
- A nemet foglalasi CTA egyelore a `/de/kontakt/` oldalra mutat, amig a SabeeApp nemet nyelvi parametere kulon nincs auditolva.

## Biztonsagos megvalositasi lepesek

1. Technikai lokalizacios alapok elokeszitese.
   - Allapot: kesz.

2. Nemet alapoldalak letrehozasa.
   - Allapot: kesz.
   - Erintett utak: `/de/`, `/de/unterkuenfte/`, `/de/kontakt/`.

3. Header, footer, nyelvvalto es SEO route-parok bekotese.
   - Allapot: kesz.
   - Csak letezo nemet oldalak kapnak aktiv linket.

4. Nemet szallasadatok elokeszitese.
   - Allapot: technikai alap kesz.
   - A shared accommodation template es a kep-szoveg lokalizacios tipus mar fogadja a `de` locale-t.
   - Egyedi, indexelheto nemet szallasoldalak meg nincsenek megnyitva.

5. Egyedi nemet szallasoldalak letrehozasa.
   - Allapot: kesobb.
   - Csak akkor indexelhetoek, ha a teljes oldalszoveg, SEO, CTA es belso linkek rendben vannak.

6. Nemet elmenyoldalak es tematikus oldalak forditasa.
   - Allapot: kesobb.
   - Addig a nemet navigacio nem mutat kulon nem letezo elmenyoldalakra.

7. Jogi oldalak nemet valtozatanak elokeszitese.
   - Allapot: kesobb.
   - Ezt kulon jogi kontrollal kell kezelni.

8. Teljes nemet belso link audit.
   - Allapot: kesobb.
   - Ellenorizendo: header, footer, CTA-k, kartyak, nyelvvalto, sitemap, hreflang.

9. Vegso build, SEO es publikacios audit.
   - Allapot: kesobb.
   - Ellenorizendo: `npm run build`, sitemap, canonical, hreflang, noindex/index, ures linkek, placeholder szovegek.

## Ellenorzesi parancsok

```powershell
npm run build
Select-String -Path dist\sitemap.xml -Pattern '/de/','/de/kontakt/','/de/unterkuenfte/'
$files = Get-ChildItem -Path dist\de -Recurse -Filter *.html
$files | Select-String -Pattern 'href=""','src=""' -SimpleMatch
```

## Kovetkezo javasolt munka

A kovetkezo biztonsagos feladat a nemet szallasadatok elokeszitese: a shared accommodation adatmodell es template DE-kompatibilis bovitesese ugy, hogy a magyar es angol oldalak viselkedese ne valtozzon.
