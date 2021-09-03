import { ref } from "@vue/reactivity";
import axios from "axios";
import { adminModel } from "../modelo/modeloAdmin";


const getAdmin = (id: string) => {
    const error = ref(null);

    let dataString = ''

    const load = async () => {
        try {
            let data = await axios.get('http://localhost:3000/api/v1/delete/user/' + id);

            console.log('Delete method', data.data[0]);
            dataString = JSON.stringify(data.data[0]);
            console.log('Resultado del delete :' + dataString)

        }

        catch(err : any) {
             error.value = err.message
             console.log(error.value)
        }
        finally{
            return {dataString, error}
        }
    }
    return Promise.resolve(load())
}

export default getAdmin

