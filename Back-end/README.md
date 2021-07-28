# TesisLucero
Tesis Lucero RestAPI en NODE JS

# Instalacion

> #### Debe tener instalada version 14.17.3 o superior
`npm install`
`npm install nodemon `

> #### Iniciar el servidor
`node server.js o nodemon server.js (para live changes)`

>#### Correr pruebas unitarias
`npm run test`

# Archivo .env

Utilizar el archivo como configuracion, setear variables. En el codigo utilizar

`process.env.NOMBRE_VARIABLE`

# Carpetas

## Db 
Contiene configuracion de postgres
## Controllers
Contiene funciones que se ejecutaran a traves de los routes
## Routes
Contiene informacion de las rutas (las rutas se registran en *server.js*)
## Tests
Contiene las pruebas unitarias

### Queries.js
Contiene queries de ejemplo utilizado en 2 endpoints actualmente

### Server.js
Contiene los registros para levantar el servidor utilizando la libreria de fastify

### Query.test.js
Contiene el script para correr pruebas unitarias
