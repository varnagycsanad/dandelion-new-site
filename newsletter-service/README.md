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

## Futtatas

```sh
cd newsletter-service
npm run start
```

## Hasznos env valtozok

- `NEWSLETTER_PORT`
- `NEWSLETTER_HOST`
- `NEWSLETTER_STORAGE_PATH`
- `NEWSLETTER_PUBLIC_BASE_URL`
- `NEWSLETTER_SMTP_HOST`
- `NEWSLETTER_SMTP_PORT`
- `NEWSLETTER_SMTP_SECURE`
- `NEWSLETTER_SMTP_USER`
- `NEWSLETTER_SMTP_PASSWORD`
- `NEWSLETTER_SMTP_FROM`
- `NEWSLETTER_SMTP_REPLY_TO`
- `NEWSLETTER_ADMIN_PASSWORD`

## MVP megjegyzes

Az SMTP kuldes most mar be van kotve, de a valos kuldeshez a fenti env mezoket ki kell tolteni. A test endpoint: `POST /smtp/test`.
