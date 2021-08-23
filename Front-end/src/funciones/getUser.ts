import { ref } from "vue"

const getUser = (id: String) => {
    const user = ref([])
    const error = ref(null)
    let showData = ref<boolean>(false)
    console.log('GetUser been executed')
    
    const load = async () => {
    try {
        console.log('getUser')
        let data = await fetch('http://localhost:3000/api/v1/user/' + id)
        if (!data.ok) {
          throw Error('No data available')
        }
        user.value = await data.json()
        showData.value = true
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { user, error, load, showData }
}

export default getUser