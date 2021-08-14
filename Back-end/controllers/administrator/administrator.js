const {getAdmin, insertaAdmin, loginAdmin } = require('./queries');

/**
 * Returns multiple sent transactions
 * @param {*} req  Proveniente del request
 * @param {*} reply  Envio del resultado en la conexion
 */
const getAdministrator = async (req, reply) => {
    try {
        var res = await getAdmin(req.params.username);
        console.log('Resultado del query', res.rows)
        reply.send(JSON.stringify(res.rows));
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

const insertAdministrator = async (req, reply) => {
    try{
        var res = await insertaAdmin(req.body.username, req.body.password, req.body.nombre,
                                    req.body.apellido, req.body.correo, req.body.telf_1,
                                    req.body.telf_2, req.body.cedula);
        reply.send(JSON.stringify({result: 'registro exitoso'}));

    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

const loginAdministrator = async (req, reply) => {
    try{
        var res = await loginAdmin(req.body.username, req.body.password);
        if(res.rows[0] == null || res.rows[0] == undefined){
            return reply.code(409).send(JSON.stringify({result:"inicio de sesión erróneo"}));
        }
        return reply.send(JSON.stringify({result:"inicio de sesión exitoso"}))
    }
    catch(e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

module.exports = {
    getAdministrator,
    insertAdministrator,
    loginAdministrator
}