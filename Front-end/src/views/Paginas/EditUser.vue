<template>
    <div class="add-contenedor">
        <form @submit.prevent="handleSubmit">
            <div v-if="showData">
                <div class="top-front">
                    <div>
                        <input v-model="userM.nombre" type="text" required name="nombre" placeholder="Nombre" />
                        <input v-model="userM.apellido" type="text" required name="apellido" placeholder="Apellido" />
                    </div>
                    <div>
                        <input v-model="cedulaN" type="text" required name="cédula" placeholder="Cédula">
                        <input v-model="userM.telf_1" type="number" required name="Teléfono" placeholder="4242196405">
                    </div>
                    <div>
                        <select v-model="formUser.role" @change="CambioRole">
                            <option value="Estudiante">Estudiante</option>
                            <option value="Docente">Docente</option>
                            <option value="Personal">Personal</option>
                        </select>
                        <input v-model="userM.correo" type="text" placeholder="Correo@gmail.com">               
                    </div>
                </div>            
                <div v-if="formUser.showCarrera">
                    <select v-model="userM.carrera" name="" id="">
                        <option v-for="carrera in formUser.carreras" v-bind:value="carrera" v-bind:key="carrera">{{ carrera }}</option>
                    </select>
                </div>
                <div v-else>
                    <input v-model="userM.especializacion" type="text" placeholder="Especializacion" name="especializacion" />
                </div>
                <div>
                    <input type="file" accept="image/*" @change="pickFile2">
                </div>
                <div id="preview">
                    <!-- <img :src="previewImage" /> -->
                    <img :src="userM.foto">
                </div>
                <div class="buttons-holder">
                    <button type="submit">Guardar</button>
                    <router-link :to="{ name: 'Principal' }">
                        <button>Cancelar</button>
                    </router-link>
                </div> 
            </div>  
            <div v-else>
                <div v-if="false">

                </div>
            </div>     
        </form>
    </div>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";

import { defineComponent, inject } from "@vue/runtime-core";
import { ref } from "vue";
import getUser from "../../funciones/getUser";
import updateUser from "../../funciones/updateUser";
import { userModel } from "../../modelo/modeloUser";

export default defineComponent({
    name: 'EditUser',
    props: ['id'],
    setup(props) {
        
        //#region GET USER DATA FOR EDITION
        let { user, userM, errorGet, load, showData } = getUser(props.id)
        let cedulaN = ref<Number | null>()
        let url : any = ref()
        var userReturn : userModel | undefined | null;

        onMounted(() => {
            Promise.resolve(load()).then(() => {
                userReturn = userM?.value;
                cedulaN.value = userReturn?.cedula;
            })
        })
        
        let CambioRole = (() => {
            console.log('updated Function role ' + formUser.value.role + formUser.value.showCarrera)
            if (formUser.value.role == 'Estudiante') {
                formUser.value.showCarrera = true
            } else {
                formUser.value.showCarrera = false
            }
        })

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
                reader.readAsDataURL(e.target.files[0]);
            }
            else {
                url.value == null;
            }
        }
        //#endregion 

        //----------------------------------------------------------------------------------------

        //#region 

        let handleSubmit = () => {
            //userM.value = user.value
            userReturn = userM?.value;
            if (userReturn !== undefined) {
                userReturn.cedulaN = cedulaN.value;
            }
            let { error, update } = updateUser(userReturn)
            //userReturn.cedulaN = cedulaN?.value
            update()
        }

        //#endregion

        return {
            CambioRole, pickFile2, formUser, user, url, showData, cedulaN,
            handleSubmit, userM
        }
    }
})
</script>

<style>

</style>