<template>
    <div class="add-contenedor">
        <form @submit.prevent="handleSubmit">
            <div class="top-front">
                <div>
                    <input v-model="user.nombre" type="text" required name="nombre" placeholder="Nombre" />
                    <input v-model="user.apellido" type="text" required name="apellido" placeholder="Apellido" />
                </div>
                <div>
                    <input v-model="user.cedula" type="text" required name="cedula" placeholder="Cédula">
                    <input v-model="user.telf_1" type="number" required name="Teléfono" placeholder="4242196405">
                </div>
                <div>
                    <select v-model="formUser.role" @change="CambioRole">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <input v-model="user.correo" type="text" placeholder="Correo@gmail.com">               
                </div>
            </div>            
            <div v-if="formUser.showCarrera">
                <select v-model="user.carrera" name="" id="">
                    <option v-for="carrera in formUser.carreras" v-bind:value="carrera" v-bind:key="carrera">{{ carrera }}</option>
                </select>
            </div>
            <div v-else>
                <input v-model="user.especializacion" type="text" placeholder="Especializacion" name="especializacion" />
            </div>
            <div>
                <input type="file" accept="image/*" @change="pickFile2">
            </div>
            <div id="preview">
                <!-- <img :src="previewImage" /> -->
                <img :src="user.foto">
            </div>
            <div class="buttons-holder">
                <button @click="Registrar" type="submit">Guardar</button>
                <router-link :to="{ name: 'Principal' }">
                    <button>Cancelar</button>
                </router-link>
            </div>        
        </form>
    </div>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";

import { defineComponent, inject } from "@vue/runtime-core";
import { ref } from "vue";
import getUser from "../../funciones/getUser"
import { userModel } from "../../modelo/modeloUser";

export default defineComponent({
    name: 'EditUser',
    props: ['id'],
    setup(props) {
        
        //const userData : any = inject('userData')
        let { user, error, load, showData } = getUser(props.id)
        console.log('console id ' + props.id)

        onMounted(() => {
            load()
        })

        
        let CambioRole = (() => {
            console.log('updated Function role ' + formUser.value.role + formUser.value.showCarrera)
            if (formUser.value.role == 'Estudiante') {
                formUser.value.showCarrera = true
            } else {
                formUser.value.showCarrera = false
            }
        })

        //let selectedFile : any
        let url : any = ref()

        const formUser = ref({
            showCarrera: true,
            role: 'Estudiante',
            especializacion: '',        
            carreras: [
                'Administración de Empresas Agropecuarias',
                'Administración en Informática',
                'Administración en Mercadeo',
                'Administración en Organización y Sistemas',
                'Administración en Recursos Humanos',
                'Administración en Recursos Materiales y Financieros',
                'Educación Inicial',
                'Educación Integral',
                'Educación Mención Inglés', 
                'Educación Mención Matemáticas',
                'Fisioterapia',
                'Medicina Veterinaria'
            ]
        })

        let pickFile2 = (e : any) => {
            console.log('Llama esta funcion pickfile');

            if((/^image+/.test(e.target.files[0].type))){
                console.log(e.target.files[0])
                //let reader = new FileReader
                var reader = new FileReader();

                //console.log(reader);

                reader.onload = e => {
                    // El texto del archivo se mostrará por consola aquí
                    let r = e?.target?.result
                    if (r !== null || r!== undefined){
                        url.value = r as string;
                        //formUser.value.userReg.foto = url.value
                    }
                    console.log('Evento:',e?.target?.result)
                };

                //reader.readAsText(e.target.files[0]);
                reader.readAsDataURL(e.target.files[0]);
            }
            else {
                url.value == null;
            }
        }

        // let handleSubmit = () => {
        //     const { error, insert } = updatetUser(userReg)
        //     insert()
        // }

        return {
            CambioRole, pickFile2, formUser, user, url
        }
    }
})
</script>

<style>

</style>