import { ref } from "@vue/reactivity";
import axios from "axios";

const deleteUser = (id: string) => {
    const error = ref(null);
    let contenido = {
        cedula: id
    };
    let resultado = ref('');
    if (id != null) {
        contenido.cedula = id.toString();
    }

    const eliminar = async () => {
        try {
            console.log('cedula del usuario ' + contenido.cedula)
            let create = await axios.post('http://localhost:3000/api/v1/administrator/deleteUser', contenido, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => response)
            .then((response) => resultado.value = response.status.toString())
            //.then((response) => console.log('resultado ' + response.status))
            .then((json) => console.log(json))
            .catch(error => console.log(error))

        }
            catch(err: any) {
            error.value = err.message
            console.log(error.value)
        }
        // finally {
        //     console.log('resultado' + resultado)
        // }
    }
    return { eliminar, error, resultado}
}

export default deleteUser

