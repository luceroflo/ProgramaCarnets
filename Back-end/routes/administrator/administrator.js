const { getAdministratorSchema, registrarAdminSchema } = require('../administrator-schemas/schema');
const { insertAdministrator } = require('../../controllers/administrator/administrator');

function transactionRoutes(fastify, options, done) {
    /**
     * Retorna Administrador por username
     * @param username
     */
    fastify.get('/administrator/user/:username', getAdministratorSchema)

    /**
     * Registra un administrador
     * @param body {registrarAdminSchema}
     */
     fastify.post('/administrator/register', registrarAdminSchema, async (req, reply) => {
        await insertAdministrator(req, reply);
     })

    done();

}


module.exports = transactionRoutes;