import { userModel } from "@/modelo/modeloUser"
import { ref } from "vue"

const getUser = (id: String) => {
  
    console.log('getUser')
    const user = ref([])
    const userM = ref<userModel>();
    const errorGet = ref(null)
    let showData = ref<boolean>(false)
    let dataString = ref([])
    //let jsonString = '';
    
    const load = async () => {
    try {
        console.log('GetUser load executed')
        let data = await fetch('http://localhost:3000/api/v1/user/' + id)
        if (!data.ok) {
          throw Error('No data available')
        }
        // user.value = await data.json()
        // showData.value = true
        dataString.value = await data.json()
        user.value = JSON.parse(JSON.stringify(dataString.value[0]))
        userM.value = JSON.parse(JSON.stringify(dataString.value[0]))
        console.log('GET METHOD RESULT: ' , userM?.value)
        //console.log( 'User other ' + userM)
        showData.value = true
      }
      catch(err) {
        errorGet.value = err.message
        console.log(errorGet.value)
      }
    }
    
    return { user, userM, errorGet, load, showData }
}

export default getUser