<template>
    <div class="add-contenedor">
        <form>
            <div class="top-front">
                <div>
                    <input v-model="primerNombre" type="text" required name="nombre" placeholder="Primer Nombre" />
                    <input v-model="prmierApellido" type="text" required name="apellido" placeholder="Primer Apellido" />
                </div>
                <div>                    
                    <input v-model="segundoNombre" type="text" name="2-nombre" placeholder="Segundo Nombre"/>
                    <input v-model="segundoApellido" type="text" name="2-apellido" placeholder="Segundo Apellido" />
                </div>
                <div>
                    <input v-model="cedula" type="text" required name="cedula" placeholder="Cédula">
                    <input v-model="telefono" type="number" required name="Teléfono" placeholder="4242196405">
                </div>
                <div>
                    <select v-model="role" @change="CambioRole">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="Personal">Personal</option>
                    </select>     
                    <input v-model="correo" type="text" placeholder="Correo@gmail.com">               
                </div>
            </div>            
            <div v-if="showCarrera">
                <select v-model="carrera" name="" id="">
                    <option value="Carreras">Carreras</option>
                </select>
            </div>
            <div v-else>
                <input v-model="especializacion" type="text" placeholder="Especializacion" name="especializacion" />
            </div>
            <div >
                <textarea v-model="direccion" type="text" placeholder="Dirección" name="direccion" /> 
            </div>
            <div>
                <button>
                    Agregar Foto
                </button>
            </div>
            <button @click="Registrar" type="submit">Registrar</button>
            <router-link :to="{ name: 'Principal' }">
                <button>Cancelar</button>
            </router-link>        
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";

export default defineComponent({
    name: 'Agregar',
    data() {
        return {
            
            showCarrera: true,

            primerNombre: '',
            prmierApellido: '',
            segundoNombre: '',
            segundoApellido: '',

            cedula: '',
            telefono: '',
            correo: '',
            role: 'Estudiante' as any,

            carrera: '',
            especializacion: '',

            direccion: '',

            carreras: []
        }
    },
    mounted() {

    },
    update() {
        console.log('updated')
        if (this.role == 'Estudiante') {
            this.showCarrera = true
        } else {
            this.showCarrera = false
        }
    },
    methods: {
        Registrar() {
            console.log('Registrar el usuario')
        },
        CambioRole() {
            console.log('updated')
            if (this.role == 'Estudiante') {
                this.showCarrera = true
            } else {
                this.showCarrera = false
            }
        }
    },
    setup() {

        const tipo = ref('')

        const stopWatch = watch(tipo, () => {
            console.log('wacth function ' + tipo)
        })

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