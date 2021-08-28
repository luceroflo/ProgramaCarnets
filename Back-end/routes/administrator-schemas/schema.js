const { getAdministrator, insertAdministrator, loginAdministrator, logoutAdministrator, isAdminLogged, updateAdmin, deleteUser } = require('../../controllers/administrator/administrator');

/*Define un esquema para el json de respuesta con el codigo
Asigna un handler para la operacion*/
const getAdministratorSchema = {
    schema: {
        response: {
            200: {
                schema: {
                    type: 'array',
                    properties: {
                        username : {type : 'string'},
                        nombre : { type : 'string'},
                        apellido : { type : 'string' },
                        correo : { type : 'string' },
                        telf_1 : { type : 'string' },
                        telf_2 : { type : 'string' },
                        id : { type : 'string' },
                        cedula: {type: 'string'}
                    }
                }
            }
        }
    },
    handler: getAdministrator
}

const loginAdminSchema = {
    schema: {
        body : {
            type: 'object',
            required : ['username', 'password'],
            properties : {
                username: { type:'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: loginAdministrator
}

const deleteUserSchema = {
    schema: {
        body:{
            type: 'object',
            required : ['cedula'],
            properties : {
                cedula : { type: 'string'} 
            }
        }
    },
    handler: deleteUser
}
const logoutAdminSchema = {
    schema: {
        response: {
            200: {}
        }
    },
    handler: logoutAdministrator
}

const isLoggedSchema = {
    schema: {
        response:{
            200 : {
                type:'object',
                properties: {
                    logged : {type:'boolean'}
                }
            }
        }
    },
    handler: isAdminLogged
}

const bodyRegistrarJsonSchema = {
    type: 'object',
    required: ['username', 'nombre', 'apellido', 'password', 'telf_1', 'correo', 'cedula'],
    properties: {
      username: { type: 'string', minLength: 5, maxLength: 20 },
      nombre: { type: 'string', maxLength: 30 },
      apellido: { type: 'string', maxLength: 30 },
      password: { type: 'string', maxLength: 20 },
      telf_1 : { type: 'string', maxLength: 11 },
      correo : { type: 'string', maxLength: 50},
      cedula : { type: 'number'},
      telf_2 : { type: 'string', maxLength: 11, nullable : true } // or { type: 'number', nullable: true }
    }
  }

  const bodyActualizarJsonSchema = {
    type: 'object',
    required: ['username', 'nombre', 'apellido', 'telf_1', 'correo', 'cedula', 'usernameN'],
    properties: {
      username: { type: 'string', minLength: 5, maxLength: 20 },
      nombre: { type: 'string', maxLength: 30 },
      apellido: { type: 'string', maxLength: 30 },
      telf_1 : { type: 'string', maxLength: 11 },
      correo : { type: 'string', maxLength: 50},
      cedula : { type: 'number'},
      telf_2 : { type: 'string', maxLength: 11, nullable : true }, // or { type: 'number', nullable: true }
      usernameN : { type: 'string', minLength: 5, maxLength: 20}
    }
  }
const registrarAdminSchema = {
    schema: {
        body : bodyRegistrarJsonSchema
    }
}

const registrarAdminSchemaResponse = {
    handler : insertAdministrator
}

const actualizaAdminSchema = {
    schema : {
        body : bodyActualizarJsonSchema
    },
    handler : updateAdmin
}
module.exports = {
    getAdministratorSchema,
    registrarAdminSchema,
    registrarAdminSchemaResponse,
    loginAdminSchema,
    logoutAdminSchema,
    isLoggedSchema,
    actualizaAdminSchema,
    deleteUserSchema
}