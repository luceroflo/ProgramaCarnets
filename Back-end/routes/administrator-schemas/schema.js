const { getAdministrator, insertAdministrator } = require('../../controllers/administrator/administrator');

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
                        codigo : { type : 'string' },
                        id : { type : 'string' }
                    }
                }
            }
        }
    },
    handler: getAdministrator
}

const bodyJsonSchema = {
    type: 'object',
    required: ['username', 'nombre', 'apellido', 'password', 'telf_1', 'correo', 'codigo'],
    properties: {
      username: { type: 'string', maxLength: 20 },
      nombre: { type: 'string', maxLength: 20 },
      apellido: { type: 'string', maxLength: 30 },
      password: { type: 'string', maxLength: 20 },
      telf_1 : { type: 'string', maxLength: 40 },
      correo : { type: 'string', maxLength: 40},
      codigo : { type : 'string', maxLength: 4},
      telf_2: { type: 'string', maxLength: 40, nullable : true } // or { type: 'number', nullable: true }
    }
  }

const registrarAdminSchema = {
    schema: {
        body : bodyJsonSchema
    }
}

const registrarAdminSchemaResponse = {
    /*schema: {
        response: {
            200: {
                schema: {
                    type: 'object',
                    properties: {
                        result : { type : 'string'}
                    }
                }
            }
        }
    },*/

    handler : insertAdministrator
}
module.exports = {
    getAdministratorSchema,
    registrarAdminSchema,
    registrarAdminSchemaResponse
}