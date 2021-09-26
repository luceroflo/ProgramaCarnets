const {getAdmin, insertaAdmin, loginAdmin, logoutAdmin, isLogged, actualizaAdmin, borraUser } = require('./queries');

/**
 * Returns multiple sent transactions
 * @param {*} req  Proveniente del request
 * @param {*} reply  Envio del resultado en la conexion
 */
const getAdministrator = async (req, reply) => {
    try {
        // if (req.params.username == null || req.params.username == undefined || req.params.username == ""){
        //     return reply.send(JSON.stringify([]));
        // }
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
        if(res == null || res == undefined){
            return reply.code(409).send(JSON.stringify({result:"Usuario o clave incorrecta"}));
        }
        return reply.send(JSON.stringify({result:"inicio de sesión exitoso"}))
    }
    catch(e) {
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

const logoutAdministrator = async (req, reply) => {
    try{
        var res = await logoutAdmin(req.params.username);
        reply.send(JSON.stringify(res.rows));
    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

const isAdminLogged = async (req, reply) => {
    try{
        var res = await isLogged(req.params.username);
        reply.send(JSON.stringify(res.rows[0]));
    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`);
    }
}

const updateAdmin = async (req, reply) => {
    try{
        var res = await actualizaAdmin(req.body);
        console.log(res.rows)
        reply.send("Actualizacion exitosa");
    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`)
    }
}

const deleteUser = async (req, reply) => {
    try{
        var res = await borraUser(req.body.cedula);
        console.log(res.rows)
        reply.send("Borrado exitoso");
    }
    catch(e){
        reply.code(500).send(`ERROR => Excepcion ejecutando query ${e}`)
    }
}
module.exports = {
    getAdministrator,
    insertAdministrator,
    loginAdministrator,
    logoutAdministrator,
    isAdminLogged,
    updateAdmin,
    deleteUser
}