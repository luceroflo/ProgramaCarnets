<template>
    <div>
        <div>
            <label for="">
                Ingrese nueva contraseña
            </label>
            <input type="password">
        </div> 
        <div>
            <label for="">
                Confirma nueva contraseña
            </label>
            <input type="password">
        </div>        
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'modalPassword'

})
</script>

<style>

</style>