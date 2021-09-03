<template>
    <div class="add-contenedor">
        <form @submit.prevent="handleSubmit">
            <div class="top-front">
                <div>
                    <input v-model="formUser.userReg.nombre" type="text" required name="nombre" placeholder="Nombre" />
                    <input v-model="formUser.userReg.apellido" type="text" required name="apellido" placeholder="Apellido" />
                </div>
                <div>
                    <input v-model="formUser.userReg.cedula" type="text" required name="cedula" placeholder="Cédula">
                    <input v-model="formUser.userReg.telf_1" type="number" required name="Teléfono" placeholder="4242196405">
                </div>
                <div>
                    <select v-model="formUser.role" @change="CambioRole">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <input v-model="formUser.userReg.correo" type="text" placeholder="Correo@gmail.com">               
                </div>
            </div>            
            <div v-if="formUser.showCarrera">
                <select v-model="formUser.userReg.carrera" name="" id="">
                    <option v-for="carrera in formUser.carreras" v-bind:value="carrera" v-bind:key="carrera">{{ carrera }}</option>
                </select>
            </div>
            <div v-else>
                <input v-model="formUser.userReg.especializacion" type="text" placeholder="Especializacion" name="especializacion" />
            </div>
            <div>
                <input type="file" accept="image/*" @change="pickFile2">
            </div>
            <div id="preview">
                <!-- <img :src="previewImage" /> -->
                <img :src="url">
            </div>
            <div class="buttons-holder">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" @click="Registrar" type="submit">Registrar</button>
                <router-link :to="{ name: 'Principal' }">
                    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Cancelar</button>
                </router-link>
            </div>        
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from "@vue/runtime-core";
import { userModel } from "../../modelo/modeloUser"
import insertUser from "../../funciones/insertUser"

export default defineComponent({
    name: 'Agregar',
    setup() {

        let CambioRole = (() => {
            console.log('updated Function role ' + formUser.value.role + formUser.value.showCarrera)
            if (formUser.value.role == 'Estudiante') {
                formUser.value.showCarrera = true
            } else {
                formUser.value.showCarrera = false
            }
        })

        let userReg : userModel = {
            nombre: '',
            apellido: '',
            cedula: null,
            telf_1: '',
            correo: '',
            carrera: '',
            especializacion: '', 
            foto: '',
            id: '',
            cedulaN: null
        }

        //let selectedFile : any
        let url : any = ref()

        const formUser = ref({
            userReg,
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
                        formUser.value.userReg.foto = url.value
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

        let handleSubmit = () => {
            const { error, insert } = insertUser(userReg)
            insert()
        }
        
        // onUpdated(() => {
        //     console.log('updated Hook role ' + formUser.value.role + formUser.value.showCarrera)
        //     if (formUser.value.role == 'Estudiante') {
        //         formUser.value.showCarrera = true
        //     } else {
        //         formUser.value.showCarrera = false
        //     }
        //     console.log('valor del nombre ' + formUser.value.userReg.nombre)
        // })


        return {
            formUser, CambioRole, url, pickFile2, handleSubmit
        }
    },
    data() {
        return {
            previewImage : ''
        };
    },
    methods: {

        // pickFile (e : any) {
        //     console.log('Llama esta funcion pickfile');

        //     if((/^image+/.test(e.target.files[0].type))){
        //         console.log(e.target.files[0])
        //         //let reader = new FileReader
        //         var reader = new FileReader();

        //         //console.log(reader);

        //         reader.onload = e => {
        //             // El texto del archivo se mostrará por consola aquí
        //             let r = e?.target?.result
        //             if (r !== null || r!== undefined){
        //                 this.previewImage = r as string;
        //             }
        //             console.log('Evento:',e?.target?.result)
        //         };

        //         //reader.readAsText(e.target.files[0]);
        //         reader.readAsDataURL(e.target.files[0]);
        //     }
        //     else {
        //         this.previewImage == null;
        //     }
        // }
        // selectImage () {
        //     this.$refs.fileInput.click()
        // },
        // pickFile () {
        //     let input = this.$refs.fileInput
        //     let file = input.files
        //     if (file && file[0]) {
        //     let reader = new FileReader
        //     reader.onload = e => {
        //         console.log('El target', e.target.result);
        //         //this.previewImage = e.target.result
        //     }
        //     reader.readAsDataURL(file[0])
        //     this.$emit('input', file[0])
        //     }
        // }
    }
})
</script>

<style scoped>
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
    /* background: #0b6dff; */
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