# Nemet lokalizacios megvalositasi terv

## Cel

A magyar honlap nemet nyelvu valtozatanak biztonsagos, lepesenkenti bevezetese ugy, hogy csak a mar ellenorzott nemet oldalak legyenek indexelhetok, a hianyzo tartalmak pedig ne vezessenek torott vagy felkesz allapothoz.

## Jelenlegi allapot

- A `/de/`, `/de/unterkuenfte/` es `/de/kontakt/` oldalak letrejottek.
- A regi `/de.astro` placeholder oldal kivezetes alatt van.
- A nemet oldalak canonical, hreflang es sitemap bekotest kaptak.
- A nemet header es footer csak letezo nemet utvonalakra mutat.
- A nemet foglalasi CTA egyelore a `/de/kontakt/` oldalra mutat, amig a SabeeApp nemet nyelvi parametere kulon nincs auditolva.
- A teljes nemet szallasoldal-keszlet elerheto es indexelheto: D1, D2, Fugehaz, Zsalya, Szololiget, Szepvolgyi, Royal Homes, Vintage es Koveskal.

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
   - Allapot: kesz.
   - A shared accommodation template es a kep-szoveg lokalizacios tipus fogadja a `de` locale-t.
   - A nemet szallasoldalak a `/de/kontakt/` foglalasi/anfrage utvonalra mutatnak.

5. Egyedi nemet szallasoldalak letrehozasa.
   - Allapot: kesz.
   - Elerheto utak: `/de/dandelion-d1/`, `/de/dandelion-d2/`, `/de/dandelion-fugehaz/`, `/de/dandelion-zsalya/`, `/de/szololiget/`, `/de/szepvolgyi/`, `/de/royal/`, `/de/dandelion-vintage/`, `/de/dandelion-koveskal/`.
   - Canonical, hreflang es sitemap ellenorzes lefutott.

6. Nemet elmenyoldalak es tematikus oldalak forditasa.
   - Allapot: kesobb.
   - Addig a nemet navigacio nem mutat kulon nem letezo elmenyoldalakra.

7. Jogi oldalak nemet valtozatanak elokeszitese.
   - Allapot: kesobb.
   - Ezt kulon jogi kontrollal kell kezelni.

8. Teljes nemet belso link audit.
   - Allapot: reszben kesz.
   - Kesz: header, footer, szallaslista-kartyak, szallasoldali CTA-k, nyelvvalto, sitemap, hreflang.
   - Hatra van: nemet elmenyoldalak es nemet jogi oldalak bekotese, ha elkeszulnek.

9. Vegso build, SEO es publikacios audit.
   - Allapot: reszben kesz.
   - Lefutott: `npm run build`, sitemap, canonical, hreflang, ures linkek es placeholder szovegek ellenorzese a jelenlegi nemet oldalakon.
   - Hatra van: vegso audit a nemet elmenyoldalak es jogi oldalak utan.

## Ellenorzesi parancsok

```powershell
npm run build
Select-String -Path dist\sitemap.xml -Pattern '/de/','/de/kontakt/','/de/unterkuenfte/'
$files = Get-ChildItem -Path dist\de -Recurse -Filter *.html
$files | Select-String -Pattern 'href=""','src=""' -SimpleMatch
```

## Kovetkezo javasolt munka

A kovetkezo biztonsagos feladat a nemet elmenyoldalak es tematikus oldalak forditasa. Ezek utan kulon jogi kontrollal johetnek a nemet jogi oldalak.
