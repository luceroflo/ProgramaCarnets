import { ref } from "@vue/reactivity";
import axios from "axios";

const getAdmin = (id: string) => {
    const admin = ref(null)
    const error = ref(null)

    const load = async () => {

        try {
            let data = await axios.get('http://localhost:3000/api/v1/administrator/user/' + id)
            .then((response) => response)
            .then((json) => console.log(json))
            .catch(error => console.log(error))
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
    }

    return { admin, error, load }
}

export default getAdmin

