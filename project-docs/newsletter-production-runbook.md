# Newsletter production runbook

Status: AKTUALIS
Last checked: 2026-06-21
Use for: éles newsletter service indítás, reverse proxy, admin használhatóság

## Cél

Az adminnak belépés után azonnal használhatónak kell lennie. Ehhez a newsletter service-nek automatikusan kell futnia a szerveren, és a site-on a `/newsletter-api` útvonalon kell elérhetőnek lennie.

## Elvárt éles felállás

1. A `newsletter-service/server.mjs` külön processzként fut.
2. A processz induljon automatikusan bootkor.
3. A webserver proxyzza a `/newsletter-api/` útvonalat a helyi service-re.
4. A frontend és az admin alapból a `/newsletter-api` útvonalat használja.

## Ajánlott rendszerindítás

### systemd

Használd a mellékelt sablont:

- `newsletter-service/deploy/systemd/dandelion-newsletter.service.example`
- `newsletter-service/deploy/newsletter-service.env.example`
- `newsletter-service/deploy/nginx/newsletter-api-location.conf.example`

### Lépések

1. Másold a service sablont valódi `.service` fájlba.
2. Másold az env sablont a szerveren pl. `/etc/dandelion/newsletter-service.env` alá.
3. Állítsd be a valódi `WorkingDirectory` és `ExecStart` utakat.
4. Töltsd be a systemd unitot és engedélyezd indulásra.
5. Rakd be az nginx location blokkot.
6. Újratöltés után a `/newsletter-api/health` legyen elérhető.

## Admin oldali viselkedés

Az alábbi oldalak most már alapból a `/newsletter-api` útvonalra mutatnak, ha nincs külön env beállítva:

- `/admin/`
- `/admin/newsletter/`
- `/admin/hirlevel/`
- `/admin/kampanyok/`
- publikus newsletter signup komponens

## Megjegyzés

Ha a site még nem kapott nginx proxyt a `/newsletter-api/` útvonalra, akkor a service ugyan elindul, de a böngészőből nem lesz elérhető. Ilyenkor először a proxy-t kell felvenni.
