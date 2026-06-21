# Dandelion newsletter service

Ez a mappa tartalmazza a sajat, szolgaltato-fuggetlen hírlevél MVP backend scaffoldot.

## Jelenlegi allapot

- feliratkozo API endpoint
- unsubscribe token kezeles
- kampany draft es mock kuldes
- JSON file alapu tarolas

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

## MVP megjegyzes

Ez meg nem vegleges SMTP kuldesi engine. A jelenlegi verzio a feliratkozas es a lista-kezeles alapjat adja meg, a valodi kuldesi integracio a kovetkezo kor.
