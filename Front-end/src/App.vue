<template>
  <router-view/>
</template>


<script lang="ts">
import { defineComponent, provide, ref } from "@vue/runtime-core";



export default defineComponent({
  setup() {

  const prueba = {
    uno: '1',
    dos: '2'
  }


  const example = ref(prueba)
  //example.value.push(prueba)

        const userLogin = ref({
        user: '',
        password: '',
      })

      provide('userLoged', userLogin)


    //provide('example', example)
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
