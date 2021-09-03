import { ref } from "@vue/reactivity";
import axios from "axios";

const deleteUser = (id: string) => {
    const error = ref(null);
    let contenido = {
        cedula: id
    };
    if (id != null) {
        contenido.cedula = id.toString();
    }

    const eliminar = async () => {
        try {
            console.log('cedula del usuario ' + contenido)
            let create = await axios.post('http://localhost:3000/api/v1/administrator/deleteUser', contenido, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => response)
            .then((response) => console.log('resultado ' + response.status))
            .then((json) => console.log(json))
            .catch(error => console.log(error))
        }
            catch(err: any) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return { eliminar, error}
}

export default deleteUser

