import { ref } from "@vue/reactivity";
import axios from "axios";
import { adminModel } from "../modelo/modeloAdmin";


const getAdmin2 = (id: string) => {
    const error = ref(null);
    let dataString = ref([])
    let adminM = ref<adminModel>();
    let jsonString = '';
    let admin = ref([])
    let dataValue = ref<boolean>(false)

    const load = async () => {
        try {

            let data = await fetch('http://localhost:3000/api/v1/administrator/user/' + id)
            if (!data.ok) {
                throw Error('No data available')
            }
            dataString.value = await data.json()
            jsonString = JSON.stringify(dataString.value[0]);
            admin.value = JSON.parse(jsonString)
            console.log('GET METHOD RESULT AFTER:', admin)
            dataValue.value = true
            adminM.value = JSON.parse(JSON.stringify(dataString.value[0]))
            if (adminM.value !== undefined) { 
                adminM.value.usernameN = adminM?.value?.username
            }
            console.log('GET METHOD RESULT: ' , adminM?.value)
            //console.log('data value ' + dataValue.value)
        }
        catch(err) {
             error.value = err.message
             console.log(error.value)
        }
    }
    return { admin, error, dataValue, adminM, load }
}

export default getAdmin2

