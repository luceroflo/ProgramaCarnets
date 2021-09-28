const pg = require('../../db/postgres');


const getUser = async (cedula) => {
    console.log('Cedula is', cedula);
    
    return rows = await pg.query(`SELECT t.nombre, t.apellido,
                                         t.correo, t.telf_1,
                                         t.id, t.cedula, t.carrera, t.foto, t.rol, t.emision, t.vencimiento
                                  FROM carnet.tb_usuario t
                                  WHERE t.cedula  = ${parseInt(cedula)}
                                  ORDER BY t.id`);
}

const getAllUsers = async () => {
    return rows = await pg.query(`SELECT t.nombre, t.apellido,
                                    t.correo, t.telf_1, 
                                    t.id, t.cedula, t.carrera, t.foto, t.emision, t.vencimiento
                                  FROM carnet.tb_usuario t
                                  ORDER BY t.id`);
}

const insertaUser = async (nombre, apellido, cedula, telf_1, correo, carrera, id, foto, rol, emision, vencimiento) => {    
    return rows = await pg.query(`INSERT INTO carnet.tb_usuario (
                                  nombre, apellido, cedula, telf_1, correo, carrera, id, foto, rol, emision, vencimiento) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [nombre, apellido, cedula, telf_1, correo, carrera, id, foto, rol, emision, vencimiento]);
}

const actualizaUser = async (nombre, apellido, cedula, telf_1, correo, carrera, cedulaN, foto, rol) => {
    return rows = await pg.query(`UPDATE carnet.tb_usuario set nombre = $1, apellido = $2, cedula = $7,
                                 telf_1 = $4, correo = $5, carrera = $6, foto = $8, rol = $9 where cedula = $3`, [nombre,apellido,cedula,telf_1,correo,carrera, cedulaN, foto, rol]);
}

const filterUserQuery = async (req) => {
    console.log('Req', req)
    var query;
    req.nombre == undefined || req.nombre == null ? query = null : query = `WHERE t.nombre LIKE '%${req.nombre}%'`
    req.apellido == undefined || req.apellido == null ? query = null : query = `WHERE t.apellido LIKE '%${req.apellido}%'`
    req.cedula == undefined || req.cedula == null ? query = null : query = `WHERE t.cedula LIKE '%${req.cedula}%'`
    req.telf_1 == undefined || req.telf_1 == null ? query = null : query = `WHERE t.telf_1 LIKE '%${req.telf_1}%'`
    req.correo == undefined || req.correo == null ? query = null : query = `WHERE t.correo LIKE '%${req.correo}%'`
    req.carrera == undefined || req.carrera == null ? query = null : query = `WHERE t.carrera LIKE '%${req.carrera}%'`
    req.cedula == undefined || req.cedula == null ? query = null : query = `WHERE t.cedula LIKE '%${req.cedula}%'`

    console.log('FilterQuery',query);

    if (query === undefined || query === null) return rows = {rows:[]};

    return rows = await pg.query(`SELECT t.nombre, t.apellido, t.correo, t.telf_1, t.id, t.cedula, t.foto FROM carnet.tb_usuario t
                                    ${query} `)
}
/*Exportar los modulos paera que puedan ser utilizados en cualquier parte de la estructura*/
module.exports = {
    insertaUser,
    getUser,
    getAllUsers,
    actualizaUser,
    filterUserQuery
}