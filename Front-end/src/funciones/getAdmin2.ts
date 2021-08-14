import { ref } from "@vue/reactivity";
import axios from "axios";
import { adminModel } from "../modelo/modeloAdmin";


const getAdmin2 = (id: string) => {
    const error = ref(null);
    let dataString = ref([])
    let jsonString = '';
    let admin = ref([])

    // let dataString = 'EMPTY'

    const load = async () => {
        try {

            let data = await fetch('http://localhost:3000/api/v1/administrator/user/' + id)
            if (!data.ok) {
            throw Error('No data available')
            }
            dataString.value = await data.json()
            jsonString = JSON.stringify(dataString.value[0]);
            admin.value = JSON.parse(jsonString)
            console.log('GET METHOD RESULT AFTER PARSING', admin)
        }
        catch(err) {
             error.value = err.message
             console.log(error.value)
        }
    }
    return { admin, error, load }
}

export default getAdmin2

