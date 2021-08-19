import { ref } from "vue"

const getUsers = () => {
    const users = ref([])
    const error = ref(null)
    
    const load = async () => {
    try {
        let data = await fetch('http://localhost:3000/api/v1/user/all')
        if (!data.ok) {
          throw Error('No data available')
        }
        users.value = await data.json()
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { users, error, load }
}

export default getUsers