//AQUI VA UN HTTP PARA REALIZAR UN INSERT EN LA BASE DE DATOS Y REGISTRARSE COMO ADMINISTRADOR
import { userModel } from "@/modelo/modeloUser"
import axios from "axios"
import { ref } from "vue"

const updateUser = (content: userModel | undefined | null) => {
    const error = ref(null)

    const update = async () => {
        
    try {
        console.log('Update USER', content)
        let update = await axios.post('http://localhost:3000/api/v1/user/update', content, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response)
        .then((json) => console.log(json))
        .catch(error => console.log(error))
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { error, update }
}

export default updateUser
