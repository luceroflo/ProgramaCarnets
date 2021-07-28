const pg = require('../../db/postgres');


const getAdmin = async (username) => {
    console.log('Username is', username);
    
    return rows = await pg.query(`SELECT t.username, t.nombre, t.apellido,
                                         t.correo, t.telf_1, t.telf_2,
                                         t.codigo, t.id
                                  FROM core.administrator t
                                  WHERE t.username like '%${username}%'
                                  ORDER BY t.id`);
}
const insertaAdmin = async (username, password, nombre, apellido, correo, telf_1, telf_2, codigo) => {    
    return rows = await pg.query(`INSERT INTO core.administrator (
                                  username, password, nombre, apellido, correo, telf_1, telf_2, codigo) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [username, password, nombre, apellido, correo, telf_1, telf_2, codigo]);
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
    insertaAdmin,
    actualizaAdmin,
    borraAdmin,
    getAdmin
}