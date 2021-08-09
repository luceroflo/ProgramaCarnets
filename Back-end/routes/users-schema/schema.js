const { getUser, insertUser } = require('../../controllers/user/user');

/*Define un esquema para el json de respuesta con el codigo
Asigna un handler para la operacion*/
const getUserSchema = {
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
                        cedula: {type: 'number'}
                    }
                }
            }
        }
    },
    handler: getUser
}

const bodyRegistrarJsonSchema = {
    type: 'object',
    required: ['nombre', 'apellido', 'password', 'telf_1', 'correo', 'carrera', 'id', 'cedula'],
    properties: {
      username: { type: 'string', maxLength: 20 },
      nombre: { type: 'string', maxLength: 30 },
      apellido: { type: 'string', maxLength: 30 },
      password: { type: 'string', maxLength: 20 },
      telf_1 : { type: 'string', maxLength: 11 },
      correo : { type: 'string', maxLength: 50},
      cedula : { type: 'number'},
      carrera : { type: 'string'},
      id : { type: 'string'} // or { type: 'number', nullable: true }
    }
  }

const registrarUserSchema = {
    schema: {
        body : bodyRegistrarJsonSchema
    }
}

const registrarUserSchemaResponse = {
    handler : insertUser
}
module.exports = {
    getUserSchema,
    registrarUserSchema,
    registrarUserSchemaResponse
}