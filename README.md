# AirTec Assist — Entorno DEV

⚠️ **DESARROLLO** — Usar para probar nuevas features sin afectar Arajet

## Diferencias con producción
- `AIRLINE_ID = 'arajet_dev'` → datos separados de Arajet
- Firebase proyecto propio (credenciales en firebase-init.js)
- Reglas Firestore permisivas (solo autenticación requerida)
- URL: `bgomez02.github.io/Airtech-dev`

## Setup inicial
1. Crea proyecto Firebase → `airtec-dev-2026`
2. Activa: Firestore + Authentication (Email/Password + Anónimo)
3. Pega credenciales en `firebase-init.js`
4. Activa GitHub Pages en este repo (Settings → Pages → main)
5. Publica reglas Firestore (`firestore.rules`)

## Deploy DEV → Producción
Cuando una feature está lista:
1. Copia los archivos modificados al repo `arajet-ops`
2. En `app.js` cambia `arajet_dev` → `arajet`
3. Restaura `firebase-init.js` de producción
4. Sube y prueba en `airtechassist.com`
