const { getUserSchema, registrarUserSchema, getAllUserSchema, updateUserSchema } = require('../users-schema/schema');
const { insertUser } = require('../../controllers/user/users');

function transactionRoutes(fastify, options, done) {
    /**
     * Retorna usuario por cedula
     * @param cedula
     */
    fastify.get('/user/:cedula', getUserSchema)

    /**
     * Retorna todos los usuarios
     */
    fastify.get('/user/all', getAllUserSchema)
    /**
     * Registra un administrador
     * @param body {registrarUserSchema}
     */
     fastify.post('/user/register', registrarUserSchema, async (req, reply) => {
        await insertUser(req, reply);
     })

     /**
      * Actualiza un usuario
      */
     fastify.post('/user/update', updateUserSchema)
    done();

}


module.exports = transactionRoutes;