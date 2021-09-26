const { getUserById, insertUser, getAllUsersC, updateUser, filterUser } = require('../../controllers/user/users');

/*Define un esquema para el json de respuesta con el codigo
Asigna un handler para la operacion*/
const getUserSchema = {
    schema: {
        response: {
            200: {
                schema: {
                    type: 'object',
                    properties: {
                        nombre : { type : 'string'},
                        apellido : { type : 'string' },
                        correo : { type : 'string' },
                        carrera : { type : 'string'},
                        telf_1 : { type : 'string' },
                        id : { type : 'number' },
                        cedula: {type: 'number'},
                        foto: {type: 'string'},
                        rol: {type: 'number'}
                    }
                }
            }
        }
    },
    handler: getUserById
}

const getAllUserSchema = {
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
                        carrera : { type : 'string'},
                        telf_1 : { type : 'string' },
                        id : { type : 'number' },
                        cedula: {type: 'number'},
                        foto : { type: 'string'},
                        rol: {type: 'number'}
                    }
                }
            }
        }
    },
    handler: getAllUsersC
}

const filterUserSchema = {
    schema : getAllUserSchema.schema,
    handler: filterUser
}

const bodyRegistrarJsonSchema = {
    type: 'object',
    required: ['nombre', 'apellido', 'telf_1', 'correo', 'carrera', 'id', 'cedula', 'foto'],
    properties: {
      username: { type: 'string', maxLength: 20 },
      nombre: { type: 'string', maxLength: 30 },
      apellido: { type: 'string', maxLength: 30 },
      telf_1 : { type: 'string', maxLength: 11 },
      correo : { type: 'string', maxLength: 50},
      cedula : { type: 'number'},
      carrera : { type: 'string'},
      id : { type: 'string'},
      foto: {type: 'string'}
    }
  }

const registrarUserSchema = {
    schema: {
        body : bodyRegistrarJsonSchema
    }
}

const updateUserSchema = {
    schema: {
        body : {
            type: 'object',
            required : ['nombre', 'apellido', 'telf_1', 'correo', 'cedula', 'carrera'],
            properties : {
                nombre: { type:'string', maxLength : 20},
                apellido: {type: 'string', maxLength: 30},
                telf_1: {type: 'string', maxLength: 11},
                correo: {type: 'string', maxLength: 50},
                cedula: {type: 'number'},
                carrera: {type: 'string', maxLength: 100},
                cedulaN: {type: 'number'},
                foto: {type: 'string'}
            }
        }
    },
    handler: updateUser
}

const registrarUserSchemaResponse = {
    handler : insertUser
}
module.exports = {
    filterUserSchema,
    getUserSchema,
    registrarUserSchema,
    registrarUserSchemaResponse,
    getAllUserSchema,
    updateUserSchema
}