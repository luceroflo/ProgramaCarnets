//AQUI VA UN HTTP PARA REALIZAR UN INSERT EN LA BASE DE DATOS Y REGISTRARSE COMO ADMINISTRADOR
import { adminModel } from "@/modelo/modeloAdmin"
import axios from "axios"
import { ref } from "vue"

const updateAdmin = (content: adminModel | undefined | null) => {
    const error = ref(null)

    const update = async () => {
        
    try {
        console.log('Update Admin', content)
        let update = await axios.post('http://localhost:3000/api/v1/administrator/update', content, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response)
        .then((json) => console.log(json))
        .catch(error => console.log(error))
      }
      catch(err: any) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { error, update }
}

export default updateAdmin
