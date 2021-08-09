//AQUI VA UN HTTP PARA REALIZAR UN INSERT EN LA BASE DE DATOS Y REGISTRARSE COMO ADMINISTRADOR
import { adminModel } from "@/modelo/modeloAdmin"
import axios from "axios"
import { ref } from "vue"

const insertAdmin = (content: adminModel) => {
    const posts = ref([])
    const error = ref(null)

    const insert = async () => {
        
    try {

        console.log(content)

        let create = await axios.post('http://localhost:3000/api/v1/usuario/register', content, {
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


    //return { posts, error, insert }
    return { error, insert }
}

export default insertAdmin