<template>

    <div>
        <h4>Uuusarios Registrados</h4>
        <div>
            <div class="filter-menu">
                <div>
                    <label for="">Filtrar por tipo:</label>
                    <select name="tipo" id="">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div>
                    <label for="">Buscar</label>
                    <input v-model="search" type="text" />
                </div>
            </div>
            <div class="cabecera-data">
                <label for="usuario">Nombre</label>
                <label for="cedula">Cédula</label>
                <label for="id">Carnet ID</label>
                <label for="Editar">Editar</label>
                <label for="Eliminar">Eliminar</label>
            </div>
            <div v-if="users" class="content-data">
                <div v-for="user in users"  v-bind:value="user" v-bind:key="user">
                    <p>{{user.nombre}}</p>
                    <p>{{user.cedula}}</p>
                    <p>{{user.id}}</p>
                    <button>editar</button>
                    <button>eliminar</button>
                </div>
            </div>
            <div v-else>
                No data available
            </div>
        </div>
    </div>
  
</template>

<script lang="ts">

import { defineComponent, onUpdated } from "@vue/runtime-core";
import { computed, ref } from "vue";
import getUsers from "../../funciones/getUsers"
import { userModel } from "../../modelo/modeloUser";

export default defineComponent({
    name: 'Ver',
    	
    setup() {

        let { users, error, load } = getUsers()
        load()
        const search = ref('') 
        let names = ref(users)
        let searchResult: userModel[] = [];
        let x : any;
        const matching = computed(() => {
            //console.log('los valores', names.value)
            // return names.value.filter((name) => {
            //     //console.log(name);
            //    // name.includes(search.value)
            //     })
        })

        onUpdated(() => {            
            // names.value.filter((n) => {
            //     n.includes(search);
            // })
            names.value.forEach((a : userModel) => {
                //console.log(a.nombre);
                if(a.nombre == search.value || a.cedula == parseInt(search.value)){
                    console.log(a);
                    searchResult.push(a);
                }
            })
            x = searchResult;
            users = ref(x);
        })


        return {
            users, error, search, matching
        }
    }
})
</script>

<style scoped>
.content-data div, .cabecera-data {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;
    grid-gap: 5px;
}

.filter-menu {
    margin: auto;
    padding: 30px;
    background-color: aliceblue;
}

</style>