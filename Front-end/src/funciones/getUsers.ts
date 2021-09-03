import { userModel } from "@/modelo/modeloUser"
import { ref } from "vue"

const getUsers = () => {
    const users = ref([])
    const error = ref(null)
    const listaUsers = ref<userModel[]>()
    const listLength = ref<number>()
    let showData = ref<boolean>(false)
    
    const load = async () => {
    try {
        let data = await fetch('http://localhost:3000/api/v1/user/all')
        if (!data.ok) {
          throw Error('No data available')
        }

        users.value = await data.json()
        listaUsers.value = users.value
        listLength.value = users.value.length
        showData.value = true
      }
      catch(err : any) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { users, listLength, listaUsers, error, load, showData }
}

export default getUsers