const pg = require('../../db/postgres');


const getAdmin = async (username) => {    
    return rows = await pg.query(`SELECT t.username, t.nombre, t.apellido,
                                         t.correo, t.telf_1, t.telf_2, 
                                         t.id, t.cedula
                                  FROM carnet.tb_admin t
                                  WHERE t.username like '%${username}%'
                                  ORDER BY t.id`);
}
const insertaAdmin = async (username, password, nombre, apellido, correo, telf_1, telf_2, cedula) => {    
    return rows = await pg.query(`INSERT INTO carnet.tb_admin (
                                  username, password, nombre, apellido, correo, telf_1, telf_2, cedula) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [username, password, nombre, apellido, correo, telf_1, telf_2, cedula]);
}

const actualizaAdmin = async (admin) => {
    return rows = await pg.query(`UPDATE carnet.tb_admin set username = $7, nombre = $2, apellido = $3,
                                  correo = $4, telf_1 = $5, cedula = $6 WHERE username = $1`, [admin.username, admin.nombre, admin.apellido, admin.correo, admin.telf_1, admin.cedula, admin.usernameN]);
}

const loginAdmin = async (username, password) => {
    rows = await pg.query(`SELECT carnet.loginAdmin($1, $2)`, [username, password]);
        if(rows.rows[0] == null || rows.rows[0] == undefined){
            return null;
        }
        return 'SUCCESS';
}

const logoutAdmin = async (username) => {
    return rows = await pg.query('UPDATE carnet.tb_admin set logged = false where username = $1', [username]);
}

const isLogged = async (username) => {
    return rows = await pg.query('SELECT logged from carnet.tb_admin where username = $1', [username]);
}
const borraAdmin = async () => {
    return rows = await pg.query(`INSERT INTO sglbtr a.id_unico, a.fe_regist, a.msgid_orgnl,
                                    FROM sglbtr.transferencia_enviada a limit 100`);
}

const borraUser = async (cedula) => {
    return rows = await pg.query(`DELETE FROM carnet.tb_usuario WHERE cedula = $1`, [cedula]);
}
/*Exportar los modulos paera que puedan ser utilizados en cualquier parte de la estructura*/
module.exports = {
    insertaAdmin,
    actualizaAdmin,
    borraAdmin,
    getAdmin,
    loginAdmin,
    logoutAdmin,
    isLogged,
    borraUser
}