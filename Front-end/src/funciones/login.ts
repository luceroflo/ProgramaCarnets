//AQUI VA UN HTTP REQUEST AL SERVIDOR PARA HACER UN SELECT LOGGEARSE A LA APLICACIÓN
import { ref } from "@vue/reactivity";

const login = (usuario: string, password: String) => {
    const result = ref(false)
    const error = ref(null)

    const load = async () => {

        try {
            let data = await fetch('http://localhost:3000/' + usuario + password)
            if (!data.ok) {
              throw Error('Error en la validación del usuario')
            }
            //LEER EL CONTENIDO DE DATA E IMPRIMIR ERRORES CORRESPONDIENTES
            //result.value = await data.json()
            //SI PASA TODAS LAS VALIDACIONES ENTONCES
            result.value = true
          }
          catch(err) {
            result.value = false
            error.value = err.message
            console.log(error.value)
          }
    }

    return { result, error, load }
}

export default login

