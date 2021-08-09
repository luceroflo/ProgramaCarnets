const pg = require('../../db/postgres');


const getUser = async (username) => {
    console.log('Username is', username);
    
    return rows = await pg.query(`SELECT t.username, t.nombre, t.apellido,
                                         t.correo, t.telf_1, t.telf_2, 
                                         t.id, t.cedula
                                  FROM carnet.tb_admin t
                                  WHERE t.username like '%${username}%'
                                  ORDER BY t.id`);
}
const insertaUser = async (nombre, apellido, cedula, telf_1, correo, carrera, id) => {    
    return rows = await pg.query(`INSERT INTO carnet.tb_usuario (
                                  nombre, apellido, cedula, telf_1, correo, carrera, id) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nombre, apellido, cedula, telf_1, correo, carrera, id]);
}

const actualizaAdmin = async () => {
    return rows = await pg.query(`INSERT INTO sglbtr a.id_unico, a.fe_regist, a.msgid_orgnl,
                                    FROM sglbtr.transferencia_enviada a limit 100`);
}

const borraAdmin = async () => {
    return rows = await pg.query(`INSERT INTO sglbtr a.id_unico, a.fe_regist, a.msgid_orgnl,
                                    FROM sglbtr.transferencia_enviada a limit 100`);
}

/*Exportar los modulos paera que puedan ser utilizados en cualquier parte de la estructura*/
module.exports = {
    insertaUser,
    actualizaAdmin,
    borraAdmin,
    getUser
}