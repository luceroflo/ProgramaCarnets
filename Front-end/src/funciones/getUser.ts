import { ref } from "vue"

const getUser = (id: String) => {
    const user = ref([])
    const error = ref(null)
    
    const load = async () => {
    try {
        let data = await fetch('http://localhost:3000/api/v1/user/' + id)
        if (!data.ok) {
          throw Error('No data available')
        }
        user.value = await data.json()
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }

    return { user, error, load }
}

export default getUser