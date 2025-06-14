# PL
##  Projekt Bezpieczenstwo Aplikacji typu WEB

### Uruchomienie wszystkich elementów projektu:

W katalogu głównym wystarczy uruchomienie kontenerow

``` docker compose up --build ```

Wtedy frontend, idp + wolumen zaczną działanie.
Backend odpalamy ręcznie, poprzez wchodzenie do folderu /backend
a nastepnie poprzez komendę
``` node server.js ```

### BACKEND - localhost:5000
### FRONTEND - localhost:4200
### IDP - localhost:8180

## Test userzy

### z rola user:
username: testuser
password: user

### z rola admin:
username: testadmin
password: admin

## ENDPOINTY BACKEND

- /public - nie wymagana jest zadna autoryzacja
- /protected - wystarczy dostarczenie tokena z idp
- /admin - token + rola admin

## LOGIKA FRONTEND

Gdy wejdziemy na strone frontend, dostaniemy informacje o zalogowaniu sie na keycloaku, po zalogowaniu sie, zaleznie od roli na jedno z dwoch wyzej podanych kont, wyswietli nam sie informacja na górze strony:

![alt text]({69DACFC6-9BB4-455A-9BEE-D2EDA2CDD82C}.png)

## Wygenerowanie tokena
dla admina

``` curl --location 'http://localhost:8180/realms/projekt-realm/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=angular-app' \
--data-urlencode 'username=testadmin' \
--data-urlencode 'password=admin'
```
dla usera
``` curl --location 'http://localhost:8180/realms/projekt-realm/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=angular-app' \
--data-urlencode 'username=testuser' \
--data-urlencode 'password=user'
```
