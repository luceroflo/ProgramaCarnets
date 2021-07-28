const {getAdmin, insertaAdmin } = require('./queries');

/**
 * Returns multiple sent transactions
 * @param {*} req  Proveniente del request
 * @param {*} reply  Envio del resultado en la conexion
 */
const getAdministrator = async (req, reply) => {
    try {
        var res = await getAdmin(req.params.username);
        console.log(`Resultado del query ${res.rows}`)
        reply.send(res.rows);
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

const insertAdministrator = async (req, reply) => {
    try{
        var res = await insertaAdmin(req.body.username, req.body.password, req.body.nombre,
                                    req.body.apellido, req.body.correo, req.body.telf_1,
                                    req.body.telf_2, req.body.codigo);
        reply.send({result: 'registro exitoso'});

    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}
module.exports = {
    getAdministrator,
    insertAdministrator
}