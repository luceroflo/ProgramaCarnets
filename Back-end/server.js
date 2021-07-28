const fastify = require('fastify')({ logger: true });

//Registra el settings en variables de entorno para ser usadas globalmente
require('dotenv').config();

//Swagger
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/swagger',
  swagger: {
    info: { title: 'TesisLuceroJS' }
  }
})

//Register rate limit (cuantas solicitudes por ip)
fastify.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})

/*//Register routes
fastify.register(require('./routes/administrator/administrator'));*/

//Register prefix
fastify.register(require('./routes/administrator/administrator'), { prefix: 'api/v1' });

//Run Server (ir al .env para cambiar el puerto)
const start = async () => {
  try {
     fastify.listen(process.env.PORT);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();



