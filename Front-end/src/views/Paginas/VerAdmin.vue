<template>
      <div class="add-contenedor">
        <form>
            <div v-if="admin" class="top-front">
                <div>
                    <input v-model="admin.nombre" type="text" required name="nombre" placeholder="nombre" />
                    <input v-model="admin.apellido" type="text" required name="apellido" placeholder="apellido" />
                </div>
                <div>
                    <input  v-model="admin.username" type="text" class="usuario" required name="usuario" placeholder="username">                    
                    <input v-model="admin.cedula" type="text" required name="cedula" placeholder="cedula">
                </div>
                <div>
                    <input v-model="admin.telf_1" type="number" required name="Teléfono" placeholder="relefono">
                    <input v-model="admin.correo" type="text" placeholder="correo">               
                </div>
                <div>
                    <button @click="Registrar" type="submit">Guardar</button>
                    <router-link :to="{ name: 'Principal' }">
                        <button>Cancelar</button>
                    </router-link>  
                </div>                  
            </div>    
        </form>
    </div>
</template>

<script lang="ts">

import { defineComponent, inject, onMounted, onUpdated, ref } from "@vue/runtime-core";
import getAdmin from "../../funciones/getAdmin"
import getAdmin2 from "../../funciones/getAdmin2"
import { adminModel } from "../../modelo/modeloAdmin"

//Falta el GET de la data
//Falta el POST de la data para el UPDATE

export default defineComponent({
    name: 'VerAdmin',
    // props: ['id'],
    setup() {
        const userLoged : any = inject('userLoged')
        userLoged.value.username = 'Garfield73'
        const { admin, error, load } = getAdmin2(userLoged.value.username)

        
        onMounted(() => {
            load()
        })
        
        //console.log(admin.value)
        onUpdated(() => {
            console.log('updated')
            console.log(admin)
        })

        // console.log(dataString.value)
        // jsonString = JSON.stringify(dataString.value);
        // console.log('JSON String ' + jsonString)
        // let admin : adminModel = JSON.parse(jsonString)

        //let some : adminModel = admin.value


        // const body : Promise<{ dataString : string, error : any }> = getAdmin('Garfield73')
        // const y = getAdmin('Garfield73');
        // let error;
        // let dataString : string;

        // body.then(a => {
        //     console.log('AQUI EL RESULTADO: ', a);
        //     dataString = a.dataString;
        //     error = a.error;

        //     admin = JSON.parse(dataString) 
        // })
        // const registro = ref({             
        //     usuarioError: '',
        //     passwordError: '',
        //     co_passwordError: ''
        // })

        // console.log('ADMIN USERNAME: ', admin.username)

        //console.log(adminReg.username)
    
        return {
            error, admin
        }

        // const example : any = inject('example')
        // console.log('provide - inject example : ' + example.value.uno)
        // console.log('provide - inject example : ' + example.value.dos)
    }
})
</script>

<style>

      form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 3px -2px 27px 8px rgba(120,127,128,1);
        /* border: 1px solid gray */
    }
        /* .top-front {
        display: block;
        text-align: center;
        margin: auto
    }
    .top-fromt div {
        margin: 0px 25px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 16px;
        grid-gap: 10px;
    } */
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        margin: 20px 0px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555
    }
    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 20px 0 20px;
        position: relative;
        top: 2px
    }
    .pill {
        display: inline-block;
        margin: 20px 10px 0 0;
        padding: 6px 12px;
        background: #eee;
        border-radius: 20px;
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #777;
        cursor: pointer;
    }
    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
        cursor: pointer
    }
    .submit {
        text-align: center;
    }
    .error {
        color: #ff0062;
        margin-top: 10px;
        font-size: 0.8em;
        font-weight: bold;
    }
    textarea {
        width: 100%;
    }
    .top-front div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }


</style>