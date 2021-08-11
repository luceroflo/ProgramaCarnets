const {getUser, insertaUser } = require('./queries');

/**
 * Returns multiple sent transactions
 * @param {*} req  Proveniente del request
 * @param {*} reply  Envio del resultado en la conexion
 */
const getUserById = async (req, reply) => {
    try {
        var res = await getUser(req.params.cedula);
        console.log(`Resultado del query ${res.rows}`)
        reply.send(res.rows);
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */
const getAllUsersC = async (req, reply) => {
    try {
        var res = await getAllUsers();
        console.log(`Resultado del query ${res.rows}`)
        reply.send(res.rows);
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

const insertUser = async (req, reply) => {
    try{
        var res = await insertaUser(req.body.nombre, req.body.apellido, req.body.cedula,
                                    req.body.telf_1, req.body.correo, req.body.carrera,
                                    req.body.id);
        reply.send({result: 'registro exitoso'});

    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}
module.exports = {
    getUserById,
    insertUser,
    getAllUsersC
}