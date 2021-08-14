const pg = require('../../db/postgres');


const getUser = async (cedula) => {
    console.log('Cedula is', cedula);
    
    return rows = await pg.query(`SELECT t.nombre, t.apellido,
                                         t.correo, t.telf_1,
                                         t.id, t.cedula
                                  FROM carnet.tb_usuario t
                                  WHERE t.cedula  = ${parseInt(cedula)}
                                  ORDER BY t.id`);
}

const getAllUsers = async () => {
    return rows = await pg.query(`SELECT t.nombre, t.apellido,
                                    t.correo, t.telf_1, 
                                    t.id, t.cedula
                                  FROM carnet.tb_usuario t
                                  ORDER BY t.id`);
}

const insertaUser = async (nombre, apellido, cedula, telf_1, correo, carrera, id) => {    
    return rows = await pg.query(`INSERT INTO carnet.tb_usuario (
                                  nombre, apellido, cedula, telf_1, correo, carrera, id) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nombre, apellido, cedula, telf_1, correo, carrera, id]);
}

const actualizaUser = async (nombre, apellido, cedula, telf_1, correo, carrera, cedulaN) => {
    return rows = await pg.query(`UPDATE carnet.tb_usuario set nombre = $1, apellido = $2, cedula = $7,
                                 telf_1 = $4, correo = $5, carrera = $6 where cedula = $3`, [nombre,apellido,cedula,telf_1,correo,carrera, cedulaN]);
}
/*Exportar los modulos paera que puedan ser utilizados en cualquier parte de la estructura*/
module.exports = {
    insertaUser,
    getUser,
    getAllUsers,
    actualizaUser
}