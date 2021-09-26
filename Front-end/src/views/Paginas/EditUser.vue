<template>
    <div class="add-contenedor">
        <form @submit.prevent="handleSubmit">
            <div v-if="showData">
                <div id="preview">
                    <img class="imagen" :src="url">
                </div>                
                <div class="top-front">
                    <div class="inside">
                        <input v-model="userM.nombre" type="text" required name="nombre" placeholder="Nombre" />
                        <input v-model="userM.apellido" type="text" required name="apellido" placeholder="Apellido" />
                    </div>
                    <div class="inside">
                        <input v-model="cedulaN" type="text" required name="cédula" placeholder="Cédula">
                        <input v-model="userM.telf_1" type="number" required name="Teléfono" placeholder="4242196405">
                    </div>
                    <div class="inside">
                        <select v-model="formUser.role" @change="CambioRole">
                            <option value="Estudiante">Estudiante</option>
                            <option value="Docente">Docente</option>
                            <option value="Personal">Trabajador</option>
                        </select>
                        <input v-model="userM.correo" type="text" placeholder="Correo@gmail.com">               
                    </div>
                </div>            
                <div class="carrera" v-if="formUser.showCarrera">
                    <select v-model="userM.carrera" name="" id="">
                        <option v-for="carrera in formUser.carreras" v-bind:value="carrera" v-bind:key="carrera">{{ carrera }}</option>
                    </select>
                </div>
                <div class="especializacion" v-else>
                    <input v-model="userM.especializacion" type="text" placeholder="Especializacion" name="especializacion" />
                </div>
                <div class="file">
                    <input type="file" accept="image/*" @change="pickFile2">
                </div>
                <div class="grid grid-cols-2 gap-4 buttons">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Guardar</button>
                    <router-link :to="{ name: 'Principal' }">
                        <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Cancelar</button>
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
import { onMounted, onUpdated } from "@vue/runtime-core";

import { defineComponent, inject } from "@vue/runtime-core";
import { ref } from "vue";
import getUser from "../../funciones/getUser";
import updateUser from "../../funciones/updateUser";
import { userModel } from "../../modelo/modeloUser";
import Swal from "sweetalert2";
// import router from "@/router";

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

                if (userReturn != undefined) {
                    if (userReturn.rol == null) {
                        formUser.value.role = 'Estudiante'
                        formUser.value.showCarrera = true                
                    } else if  (userReturn.rol == 1) {
                        formUser.value.role = 'Docente'
                        formUser.value.showCarrera = false
                    } else {
                        formUser.value.role = 'Personal'
                        formUser.value.showCarrera = false
                        userReturn.rol = 2
                    }
                }
                // if (userM.value != undefined) {
                //     url = userM?.value.foto 
                //     console.log('url' + url)
                // }
            })
        })
        
        let CambioRole = (() => {
            console.log('updated Function role ' + formUser.value.role + formUser.value.showCarrera)

            if (userReturn != undefined) {
                if (formUser.value.role == 'Estudiante') {
                    userReturn.rol = null
                    formUser.value.showCarrera = true                
                } else if  (formUser.value.role == 'Docente') {
                    formUser.value.showCarrera = false
                    userReturn.rol = 1
                } else {
                    formUser.value.showCarrera = false
                    userReturn.rol = 2
                }
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
                        if (userM.value !== undefined) {
                            userM.value.foto = r as string
                        }
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

        onUpdated(() => {
            if (userM.value != undefined) {
                url.value = userM?.value.foto 
                console.log('url updated' + url.value)
            }
        })
        //#endregion 

        //----------------------------------------------------------------------------------------

        //#region 

        let handleSubmit = () => {
            //userM.value = user.value
            userReturn = userM?.value;
            if (userReturn !== undefined) {
                userReturn.cedulaN = cedulaN.value;
            }
            let { error, resultado, update } = updateUser(userReturn)
            //userReturn.cedulaN = cedulaN?.value

            Promise.resolve(update())
            .then(() => {
                if (resultado.value === '200') {
                    console.log('resultado ' + resultado);
                    Swal.fire({title: 'Usuario editado', text: 'Guardado exitoso', icon: 'success'});
                } else {
                    console.log('resultado ' + resultado);
                    Swal.fire({title: 'Error', text: 'Error en el guardado', icon: 'error'});
                }
            })
        }

        //#endregion

        return {
            CambioRole, pickFile2, formUser, user, url, showData, cedulaN,
            handleSubmit, userM
        }
    }
})
</script>

<style scoped>
.grid button {
    margin: auto
}

.imagen {
    height: 190px;
    width: 190px;
      margin: 0 auto 30px;
  border-radius: 50%;
}

.carrera, .especializacion, .file, .top-front .inside, .buttons {
    margin-top: 20px
}


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
    .buttons-holder {
        text-align: center;
    }
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
    img {
        margin: auto;
    }


</style>