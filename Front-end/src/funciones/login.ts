//AQUI VA UN HTTP REQUEST AL SERVIDOR PARA HACER UN SELECT LOGGEARSE A LA APLICACIÓN
import { ref } from "@vue/reactivity";
import axios from "axios";

const login = (user: string, pass: String) => {
    const result = ref('')
    const errores = ref('')

    let resultado = '';
    let logInfo = {
      username: user,
      password: pass
    }


    const load = async () => {
      try {
          let data = await axios.post('http://localhost:3000/api/v1/administrator/login', logInfo, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          })
          .then((response) => response)
          .then((response) => result.value = response.status.toString())
          .then((json) => console.log(json))
          .catch(error => errores.value = JSON.parse(JSON.stringify(error.response)))
        }
        catch(err: any) {
          console.log('error in the request')
          errores.value = err.message
          console.log(errores.value)
        }
    }

    return { result, errores, load }
}

export default login

