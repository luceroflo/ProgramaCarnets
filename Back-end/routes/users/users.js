const { getUserSchema, registrarUserSchema } = require('../users-schema/schema');
const { insertUser } = require('../../controllers/user/user');

function transactionRoutes(fastify, options, done) {
    /**
     * Retorna Administrador por username
     * @param username
     */
    fastify.get('/user/:cedula', getUserSchema)

    /**
     * Registra un administrador
     * @param body {registrarUserSchema}
     */
     fastify.post('/user/register', registrarUserSchema, async (req, reply) => {
        console.log(`Entro en endpoint registrar user => ${req.body}`);
        await insertUser(req, reply);
     })

    done();

}


module.exports = transactionRoutes;