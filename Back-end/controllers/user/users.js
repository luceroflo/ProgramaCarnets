const {getUser, insertaUser, getAllUsers, actualizaUser } = require('./queries');

/**
 * Returns multiple sent transactions
 * @param {*} req  Proveniente del request
 * @param {*} reply  Envio del resultado en la conexion
 */
const getUserById = async (req, reply) => {
    try {
        var res = await getUser(req.params.cedula);
        console.log(`Resultado del query ${res.rows}`);
        if(res.rows[0] == null || res.rows[0] == undefined){
            return reply.send(JSON.stringify({}));
        }
        return reply.send(JSON.stringify(res.rows));
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

// const getUserByIdOld = async (req, reply) => {
//     try {
//         var res = await getUser(req.params.cedula);
//         console.log(`Resultado del query ${res.rows}`);
//         if(res.rows[0] == null || res.rows[0] == undefined){
//             return reply.send(JSON.stringify({}));
//         }
//         return reply.send(JSON.stringify(res.rows[0]));
//     }
//    catch (e) {
//         reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
//    }
// }

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */
const getAllUsersC = async (req, reply) => {
    try {
        var res = await getAllUsers();
        console.log(`Resultado del query ${res.rows}`)
        reply.send(JSON.stringify(res.rows));
    }
   catch (e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
   }
}

const insertUser = async (req, reply) => {
    try{
        var res = await insertaUser(req.body.nombre, req.body.apellido, req.body.cedula,
                                    req.body.telf_1, req.body.correo, req.body.carrera,
                                    req.body.id, req.body.foto);
        reply.send(JSON.stringify({result: 'registro exitoso'}));

    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

const updateUser = async (req, reply) => {
    try{
        var res = await actualizaUser(req.body.nombre, req.body.apellido, req.body.cedula,
            req.body.telf_1, req.body.correo, req.body.carrera, req.body.cedulaN, req.body.foto);
        reply.send(JSON.stringify({result: 'actualizacion exitosas'}));
    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}
module.exports = {
    getUserById,
    insertUser,
    getAllUsersC,
    updateUser
}