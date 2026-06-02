# Server WordPress Audit

Generated: 2026-06-02T19:21:41Z

## Remote File-System Findings

### Top-level entries
```text
/-rw------- 14 2026-05-12 22:57 ./.ftpquota
/-rw-r--r-- 104454 2026-05-14 09:44 ./favicon.png
/-rw-r--r-- 117171 2026-05-29 22:34 ./index.html
/-rw-r--r-- 163 2026-05-19 23:39 ./favicon.svg
/-rw-r--r-- 185 2026-06-01 19:10 ./robots.txt
/-rw-r--r-- 2099 2026-05-19 23:39 ./favicon.ico
/-rw-r--r-- 47 2026-05-27 20:16 ./deploy-check.txt
/-rw-r--r-- 5624 2026-05-25 20:50 ./sitemap.xml
/-rw-r--r-- 7080 2026-06-01 22:58 ./.htaccess
/drwxr-xr-x 24576 2026-06-02 21:17 ./assets
/drwxr-xr-x 4096 2026-05-10 22:08 ./dandelion-royal-homes
/drwxr-xr-x 4096 2026-05-12 10:44 ./.well-known
/drwxr-xr-x 4096 2026-05-12 20:12 ./vendor
/drwxr-xr-x 4096 2026-05-15 20:45 ./_astro
/drwxr-xr-x 4096 2026-05-19 21:24 ./images
/drwxr-xr-x 4096 2026-05-27 21:45 ./adatkezelesi-tajekoztato
/drwxr-xr-x 4096 2026-05-27 21:45 ./aszf
/drwxr-xr-x 4096 2026-05-27 21:45 ./dandelion-vintage
/drwxr-xr-x 4096 2026-05-27 21:45 ./impresszum
/drwxr-xr-x 4096 2026-05-27 21:45 ./kapcsolat
/drwxr-xr-x 4096 2026-05-27 21:45 ./scripts
/drwxr-xr-x 4096 2026-05-27 21:54 ./docs
/drwxr-xr-x 4096 2026-05-29 08:34 ./elmenyek
/drwxr-xr-x 4096 2026-05-29 22:24 ./panorama-pool
/drwxr-xr-x 4096 2026-06-02 21:16 ./cs
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-d1
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-d2
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-koveskal
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-szepvolgyi-vendeghaz
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-szololiget
/drwxr-xr-x 4096 2026-06-02 21:16 ./dandelion-zsalya
/drwxr-xr-x 4096 2026-06-02 21:16 ./de
/drwxr-xr-x 4096 2026-06-02 21:16 ./en
/drwxr-xr-x 4096 2026-06-02 21:16 ./fuge
/drwxr-xr-x 4096 2026-06-02 21:16 ./royal
/drwxr-xr-x 4096 2026-06-02 21:16 ./szepvolgyi
/drwxr-xr-x 4096 2026-06-02 21:16 ./szololiget
/drwxr-xr-x 4096 2026-06-02 21:18 ./guide
/drwxr-xr-x 4096 2026-06-02 21:18 ./szallasok
/drwxr-xr-x 4096 2026-06-02 21:18 ./videos
/drwxr-xr-x 4096 2026-06-02 21:20 ./api
```

### WordPress core/plugin/theme markers
```text
```

### PHP files near docroot
```text
/2285 2026-05-21 19:42 ./api/pool-temperature-update.php
```

### wp-content uploads sample
```text
wp-content/uploads not found
```

### Active .htaccess WordPress-related rules
```text
2:# [CHANGE 2026-05-29 00:00] Redirect legacy WordPress URLs from Search Console coverage reports.
56:  RewriteRule ^ https://dandelionhouse.hu%{REQUEST_URI} [L,R=301]
61:  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
64:  RewriteRule ^sitemap[_-]index\.xml$ /sitemap.xml [R=301,L]
66:  # Legacy WordPress technical endpoints should disappear cleanly.
67:  RewriteRule ^wp-admin/ - [G,L]
68:  RewriteRule ^wp-json/ - [G,L]
69:  RewriteRule ^wp-[^/]+\.php$ - [G,L]
70:  RewriteRule ^comments/feed/?$ - [G,L]
71:  RewriteRule ^\*$ - [G,L]
74:  RewriteRule ^(?:home|fooldal|test|test-2|valami)/?$ /? [R=301,L]
75:  RewriteRule ^ipv6\.dandelionhouse\.hu/?$ /? [R=301,L]
77:  RewriteRule ^(?:fooldal/?)?$ /? [R=301,L]
80:  RewriteRule ^(?:hu/)?kapcsolat-2/?$ /kapcsolat/? [R=301,L]
81:  RewriteRule ^(?:hu/)?arak-es-foglalasi-feltetelek/?$ /szallasok/? [R=301,L]
82:  RewriteRule ^altalanos-szerzodesi-feltetelek/?$ /aszf/? [R=301,L]
83:  RewriteRule ^adatvedelem/?$ /adatkezelesi-tajekoztato/? [R=301,L]
86:  RewriteRule ^zsalya/?$ /dandelion-zsalya/? [R=301,L]
87:  RewriteRule ^koveskal/?$ /dandelion-koveskal/? [R=301,L]
88:  RewriteRule ^vintage/?$ /dandelion-vintage/? [R=301,L]
89:  RewriteRule ^fuge-vendeghaz/?$ /fuge/? [R=301,L]
90:  RewriteRule ^badacsonyhaz/?$ /szepvolgyi/? [R=301,L]
91:  RewriteRule ^dandelion-royal-homes/?$ /royal/? [R=301,L]
92:  RewriteRule ^dandelion-szololiget/?$ /szololiget/? [R=301,L]
93:  RewriteRule ^dandelion-szepvolgyi-vendeghaz/?$ /szepvolgyi/? [R=301,L]
94:  RewriteRule ^dandelion-2-d2/zsalya/?$ /dandelion-zsalya/? [R=301,L]
95:  RewriteRule ^szallas-kisapati/?$ /szallasok/? [R=301,L]
96:  RewriteRule ^szallas-kisapatin-d2-(?:apartman|vendeghaz)-a-szent-gyorgy-hegy-labanal-dandelion-vendeghazak/?$ /dandelion-d2/? [R=301,L]
98:  # Legacy blog, category and tag URLs.
99:  RewriteRule ^feed/?$ /? [R=301,L]
100:  RewriteRule ^blog/?$ /elmenyek/? [R=301,L]
101:  RewriteRule ^hasznos(?:-[23])?/?$ /elmenyek/? [R=301,L]
102:  RewriteRule ^hu/hasznos-2/?$ /elmenyek/? [R=301,L]
103:  RewriteRule ^project/?$ /szallasok/? [R=301,L]
104:  RewriteRule ^project/fooldali-haz-bemutato/?$ /szallasok/? [R=301,L]
105:  RewriteRule ^category/(?:kornyek|kornyek/programtippek|kornyek/turak|nevezetessegek|hegyek)/?(?:feed/?)?$ /elmenyek/? [R=301,L]
106:  RewriteRule ^category/dandelion-hazakkal-kapcsolatos-informaciok/?(?:feed/?)?$ /szallasok/? [R=301,L]
107:  RewriteRule ^category/dandelion-vendeghazak-szent-gyorgy-hegy-2/?(?:feed/?)?$ /szallasok/? [R=301,L]
108:  RewriteRule ^category/egyeb-kategoria-hu/?(?:feed/?)?$ /? [R=301,L]
109:  RewriteRule ^tag/(?:tavmunka|workation|digitalis-nomad|hosszutavu-szallas)/?(?:feed/?)?$ /szallasok/? [R=301,L]
110:  RewriteRule ^tag/balaton-felvidek/?(?:feed/?)?$ /elmenyek/? [R=301,L]
111:  RewriteRule ^author/vilona/?(?:feed/?)?$ /? [R=301,L]
114:  RewriteRule ^szent-gyorgy-hegyi-kirandulas/?$ /elmenyek/tanuhegyek/? [R=301,L]
115:  RewriteRule ^szent-gyorgy-hegy-bazaltorgonak-tura-es-panorama-a-balaton-felvideken-dandelion-vendeghazak/?$ /elmenyek/tanuhegyek/? [R=301,L]
116:  RewriteRule ^szureti-felvonulas-szent-gyorgy-hegy-hegymagas-raposka-kisapati-2025-okt-11-dandelion/?$ /elmenyek/bor-es-panorama/? [R=301,L]
117:  RewriteRule ^dolgozz-onnan-ahol-mas-nyaral-digitalis-nomad-szallas-a-balaton-felvideken/?$ /szallasok/? [R=301,L]
118:  RewriteRule ^digitalis-nomad-szallas-balaton-felvidek/?$ /szallasok/? [R=301,L]
121:  RewriteRule ^assets/ - [END]
122:  RewriteRule ^deploy-check\.txt$ - [END]
123:  RewriteRule ^favicon\.(ico|png|svg)$ - [END]
126:  RewriteRule ^en/panorama-pool/?$ en/panorama-pool.html [L]
131:  RewriteRule ^(.+)$ /$1/ [R=301,L]
136:  RewriteRule ^(.+?)/$ /$1/index.html [END]
141:  RewriteRule ^ - [END]
144:  RewriteRule ^$ index.html [END]
145:  RewriteRule ^index\.html$ - [END]
```

## HTTP Checks

```text
https://dandelionhouse.hu/wp-admin/ -> 410 
https://dandelionhouse.hu/wp-login.php -> 410 
https://dandelionhouse.hu/wp-content/ -> 404 
https://dandelionhouse.hu/wp-includes/ -> 404 
https://dandelionhouse.hu/wp-json/ -> 410 
https://dandelionhouse.hu/xmlrpc.php -> 520 
https://dandelionhouse.hu/category/kornyek/ -> 301 https://dandelionhouse.hu/elmenyek/
https://dandelionhouse.hu/category/kornyek/feed/ -> 301 https://dandelionhouse.hu/elmenyek/
https://dandelionhouse.hu/tag/hosszutavu-szallas/ -> 301 https://dandelionhouse.hu/szallasok/
https://dandelionhouse.hu/zsalya/ -> 301 https://dandelionhouse.hu/dandelion-zsalya/
https://dandelionhouse.hu/elmenyek -> 301 https://dandelionhouse.hu/elmenyek/
```
