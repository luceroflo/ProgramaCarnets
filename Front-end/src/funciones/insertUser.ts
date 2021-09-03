//AQUI VA UN HTTP PARA REALIZAR UN INSERT EN LA BASE DE DATOS Y REGISTRARSE COMO ADMINISTRADOR
import { userModel } from "@/modelo/modeloUser"
import axios from "axios"
import { ref } from "vue"

const insertUser = (content: userModel) => {
    const posts = ref([])
    const error = ref(null)

    const insert = async () => {
        
    try {
        console.log(content)

        let create = await axios.post('http://localhost:3000/api/v1/user/register', content, {
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
    //return { posts, error, insert }
    return { error, insert }
}

export default insertUser
