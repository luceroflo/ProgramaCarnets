const { getAdministratorSchema, registrarAdminSchema, loginAdminSchema, logoutAdminSchema, isLoggedSchema, actualizaAdminSchema } = require('../administrator-schemas/schema');
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
        console.log(`Entro en endpoint registrar => ${req.body}`);
        await insertAdministrator(req, reply);
     })

     /**
      * Inicia sesión a un administrador
      * @param body {loginAdminSchema}
      */
     fastify.post('/administrator/login', loginAdminSchema)

     /**
      * @param body {logoutAdminSchema}
      */
     fastify.get('/administrator/logout/:username', logoutAdminSchema)

     /**
      * @param body {}
      */
     fastify.get('/administrator/checkout/:username', isLoggedSchema)

     /**
      * @param body {actualizaAdminSchema}
      */
     fastify.post('/administrator/update', actualizaAdminSchema)
    
    done();

}


module.exports = transactionRoutes;