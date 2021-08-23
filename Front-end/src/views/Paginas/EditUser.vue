<template>
  <div>
      Usuario Editado
  </div>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";

import { defineComponent, inject } from "@vue/runtime-core";
import getUser from "../../funciones/getUser"

export default defineComponent({
    name: 'EditUser',
    props: ['id'],
    setup() {
        
        const userData : any = inject('userData')
        let { user, error, load, showData } = getUser('12')
        console.log(userData.value.user)

        onMounted(() => {
            load()
        })
    }
})
</script>

<style>

</style>