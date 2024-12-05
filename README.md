# AireLibre

## ¿Qué es AireLibre?

AireLibre es una respuesta de la comunidad a la necesidad de saber sobre la calidad del aire de manera libre, colaborativa y descentralizada.

## Razón de ser

En resumen es responder a: Quiero salir a trotar ¿Puedo ahora o me va a hacer mal?

## Proyectos bajo el «paraguas» de AireLibre

AireLibre es un conjunto de proyectos e iniciativas, algunas como:

* Red Descentralizada de Aire Libre(**ReDAL**): La red de sensores de calidad de aire.
* [Linka: El Backend y API que recibe las mediciones de los sensores](https://github.com/tchx84/linka)
* [Linka Firmware](https://github.com/garyservin/linka-firmware/): Firmware de arduino
* [LinkaBot:](https://github.com/melizeche/linkaBot) el bot de twitter que postea cada 2 horas [@KoaNdeAire](https://twitter.com/KoaNdeAire)
* [AQmap: Mapa web en Go](https://github.com/matiasinsaurralde/aqmap)
* [App Android](https://github.com/LucasGinard/AireLibre-Android) Disponible en la -> [PlayStore](https://play.google.com/store/apps/details?id=com.lucasginard.airelibre)
* [App iOS](https://github.com/LucasGinard/AireLibre-iOS) Disponible en la -> [AppStore](https://apps.apple.com/us/app/airelibre-calidad-del-aire/id6446297783)

## FAQ

### ¿Existen otras iniciativas similares?

Si, pero no están abiertas a la colaboración de la comunidad ni son de código abierto.

### ¿Puedo sumarme a la red?

Claro, sin problemas!

### Quiero sumarme a la red, ¿qué necesito?

Básicamente un sensor que se comunique con Linka, nuestro backend.

### Quiero construir un sensor, ¿qué necesito?

#### Materiales necesarios:
* Sensor de calidad del aire Plantpower PMS7003 (asegurarse de que venga con la placa adaptadora) [Aliexpress](https://www.aliexpress.com/item/32784279004.html) [Ebay](https://www.ebay.com/itm/High-Precision-Laser-Dust-Sensor-Module-PM2-5-PM10-for-PMS7003-Cable-for-Arduino/303452433279) [Amazon](https://www.amazon.com/DSLE-Digital-PLANTOWER-PMS7003-Adapter/dp/B08M2F4B9R)
* Placa ESP8266, nosotros usamos la Wemos D1 mini [Aliexpress](https://www.aliexpress.com/item/32787418018.html) [Ebay](https://www.ebay.com/itm/D1-Mini-NodeMcu-4M-bytes-Lua-WIFI-Development-Board-ESP8266-by-WeMos/224207727199)
* Caja plástica exterior 100x100mm [Luminotecnia](https://www.luminotecnia.com.py/producto/975/caja-exterior-plastica-de-conexion-100x100)
* Prensacables (opcional) [Luminotecnia](https://www.luminotecnia.com.py/producto/3720/prensacable-pg-11)
* Cable micro USB
* Cargador USB

#### Herramientas necesarias
* Soldador 40W
* Estaño
* Pinzas para corte
* Destornilladores

#### Guía de armado
TBA

### ¿Por qué tantos proyectos diferentes?

Es una iniciativa descentralizada y medio va por ese lado.

### ¿Puedo extender/sumar proyectos a AireLibre?

Claro, es una iniciativa comunitaria, si querés crear alguna solución, frontend, bot o lo que se te ocurra podés hacerlo, avisanos y lo agregamos al readme.

### ¿Puedo crear mi propia red?

Claro, la licencia te permite, si por alguna razón sumarte a la Red Descentralizada de AireLibre no soluciona tus necesidades podes clonar los repositorios adaptarlos a tu necesidad.

### ¿Es de uso profesional/industrial/científico/militar?

No.

### ¿Los sensores son calibrados en Suiza?

No, en Luque.

### ¿Por qué Linka?

¿Nunca viste Capitán Planeta? Linka era la planetaria del viento.
![](https://captainplanetfoundation.org/wp-content/uploads/Linka-1.png)

## Contribuir

Si es un feature nuevo antes de contribuir preguntá en los issues si tu funcionalidad es necesitada por el proyecto

1. Forkeá el proyecto!
2. Creá tu feature branch: `git checkout -b my-new-feature`
3. Commiteá tus cambios: `git commit -am 'Add some feature'`
4. Pusheá a tu branch: `git push origin my-new-feature`
5. Enviá un pull request al branch `main`
   
## Licencia

[GNU Affero General Public License](LICENSE)
