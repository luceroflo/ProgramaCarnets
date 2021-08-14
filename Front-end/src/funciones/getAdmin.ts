import { ref } from "@vue/reactivity";
import axios from "axios";
import { adminModel } from "../modelo/modeloAdmin";


const getAdmin = (id: string) => {
    const error = ref(null);

    let dataString = 'EMPTY'

    const load = async () => {
        try {
            let data = await axios.get('http://localhost:3000/api/v1/administrator/user/' + id);

            console.log('Y MIYAGUI', data.data[0]);
            dataString = JSON.stringify(data.data[0]);
            // .then((response) => response)
            // .then((json) => {
            //     dataString = JSON.stringify(json.data[0])
            //     console.log(dataString)
            //     // admin = JSON.parse(dataString)
            //     // console.log(admin.username)
            //     // console.log(admin.nombre)
            // })
            // .catch(error => console.log(error))

            console.log('GET METHOD RESULT AFTER PARSING')

            // .then((result) => {
            //     console.log(result.data);
            // }
            // .catch(error => console.log(error))
        }
            // if (!data.ok) {
            //    throw Error('That post does not exist')
            // }

            //admin.value = await data

        catch(err) {
             error.value = err.message
             console.log(error.value)
        }
        finally{
            return {dataString, error}
        }
    }

    console.log('INICIA');
    return Promise.resolve(load())
}

export default getAdmin

