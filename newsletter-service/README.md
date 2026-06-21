# Dandelion newsletter service

Ez a mappa tartalmazza a sajat, szolgaltato-fuggetlen hírlevél MVP backend scaffoldot.

## Jelenlegi allapot

- feliratkozo API endpoint
- unsubscribe token kezeles
- kampany draft es SMTP kuldes
- JSON file alapu tarolas
- kampanykezelo oldal: `/admin/kampanyok`
- admin lista felulet: `/admin/hirlevel`
- admin kezdooldal: `/admin`
- admin jelszavas vedelem
- CSV/TSV subscriber import az admin lista oldalon

## Futtatas

```sh
cd newsletter-service
npm run start
```

## Eleves / production javaslat

A frontend és az admin most alapból a `/newsletter-api` útvonalat használják, ha nincs külön env beállítva.
Productionban ezért az ajánlott felállás:

- a `newsletter-service` külön processzként fut
- a webserver proxyzza a `/newsletter-api/` útvonalat a `127.0.0.1:3876` service-re
- az e-mailekhez a `NEWSLETTER_PUBLIC_BASE_URL` maradjon a publikus domain

Sablonok:

- `newsletter-service/deploy/systemd/dandelion-newsletter.service.example`
- `newsletter-service/deploy/newsletter-service.env.example`
- `newsletter-service/deploy/nginx/newsletter-api-location.conf.example`

## Hasznos env valtozok

### Minimum indulashoz

Ezekkel mar el lehet indulni fejleszteshez:

- `PUBLIC_NEWSLETTER_API_URL`
- `NEWSLETTER_ADMIN_PASSWORD`

### Helyi `.env.local` minta

```env
PUBLIC_NEWSLETTER_API_URL=/newsletter-api
NEWSLETTER_PORT=3876
NEWSLETTER_HOST=127.0.0.1
NEWSLETTER_STORAGE_PATH=.secrets/newsletter-db.json
NEWSLETTER_PUBLIC_BASE_URL=http://127.0.0.1:3876
NEWSLETTER_ADMIN_PASSWORD=ide_jon_egy_sajat_jelszo
```

### SMTP kuldeshez

Ha teszt- vagy elevelest is kuldeni akarsz, ezeket is meg kell adni:

- `NEWSLETTER_SMTP_HOST`
- `NEWSLETTER_SMTP_PORT`
- `NEWSLETTER_SMTP_SECURE`
- `NEWSLETTER_SMTP_USER`
- `NEWSLETTER_SMTP_PASSWORD`
- `NEWSLETTER_SMTP_FROM`
- `NEWSLETTER_SMTP_REPLY_TO`

## MVP megjegyzes

Az SMTP kuldes most mar be van kotve, de a valos kuldeshez a fenti SMTP env mezoket ki kell tolteni. A test endpoint: `POST /smtp/test`.
Az admin felulet jelszavas vedelemmel mukodik, a listaoldalon pedig CSV/TSV importtal lehet feliratkozokat betolteni.
Ha productionon futtatod, ne közvetlen `http://127.0.0.1:3876` URL-re mutasson a frontend, hanem a proxyn keresztül elérhető `/newsletter-api` útvonalra.
