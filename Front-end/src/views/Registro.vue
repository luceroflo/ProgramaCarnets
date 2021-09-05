<template>
  <div class="grid grid-cols-2 h-screen">
    <left-login></left-login>
    <div class="right">
      <div class="">
        <form @submit.prevent="handleSubmit" class="form__login" autocomplete="off">
          <div class="form__title">
            <h2 class="font-sans text-black text-4xl py-5 italic">Registro</h2>
          </div>
          <div class="">
            <img src="../assets/img/register.jpg"  alt="">
          </div>
          <div class="grid grid-cols-2">
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pr-5">
              <label for="">Usuario:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.username"
                  type="text"
                  name="Usuario"                    
                  placeholder="Usuario"
                  required
                  autofocus
              />
              <div v-if="registro.usuarioError" class="error">{{registro.usuarioError}}</div>
            </div>
            <div  class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pl-5">
              <label for="">Nombre:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.nombre"
                  type="text"
                  name="Nombre"                    
                  placeholder="Nombre"
                  required
                  autofocus
              />              
            </div>
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pr-5">
              <label for="">Apellido:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.apellido"
                  type="text"
                  name="Apellido"                    
                  placeholder="Apellido"
                  required
                  autofocus
              />
            </div>
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pl-5">
              <label for="">Cédula:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.cedula"
                  type="text"
                  name="Cedula"                    
                  placeholder="Cedula"
                  required
                  autofocus
              />              
            </div>    
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pr-5">
              <label for="">Correo:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.correo"
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  required
              />
            </div>
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pl-5">
              <label for="">Teléfono:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.telf_1"
                  type="number"
                  name="telefono"
                  placeholder="4142566555"
                  required
              />          
            </div>
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pr-5">
              <label for="">Contraseña:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.password"
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  required
              />
              <div v-if="registro.passwordError" class="error">{{registro.passwordError}}</div>           
            </div>
            <div class="grid grid-cols-1 gap mx-30 px-10 mb-2 py-2 pl-5">
              <label for="">Confirmar ****:</label>
              <input class="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  v-model="registro.adminReg.co_password"
                  type="password"
                  name="contraseña"
                  placeholder="Confirmar Contraseña"
                  required
              />     
              <div v-if="registro.co_passwordError" class="error">{{registro.co_passwordError}}</div>       
            </div>        
          </div>



          <!-- <input
              v-model="registro.adminReg.codigo"
              type="codigo"
              name="codigo"
              placeholder="Código"
              class="form__input"                    
          /> -->
          <div class="grid grid-cols-1 gap-5 px-32 mt-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-8 rounded-full" type="submit" value="Registrate">
              Registrate
            </button>
            <p class="">
              ¿Tienes Cuenta?
              <router-link :to="{ name: 'Ingreso' }" class="">
                  <a class="text-blue-500">Inicia Sesión Aquí</a>
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "@vue/runtime-core";
import { adminModel } from "../modelo/modeloAdmin"
import insertAdmin from "../funciones/insertAdmin";
import LeftLogin from "../components/left-login.vue"

export default defineComponent({
    name: 'Registro',
    components: {
      LeftLogin
    },
    setup() {
        //Ref
        let adminReg : adminModel = {
            username: 'usuario',
            nombre: 'nombre',
            apellido: 'apellido',
            cedula: 5,
            correo: 'raga@gmail.com',
            telf_1: '04242186302',
            telf_2: '04123858558',
            //codigo: '',
            password: '123456789',
            co_password: '123456789',
            usernameN: null
            // //VALIDACIONES
            // usuarioError: '',
            // passwordError: '',
            // co_passwordError: ''
        }
        const registro = ref({ 
            adminReg,
            usuarioError: '',
            passwordError: '',
            co_passwordError: ''
        })
        const updateOne = () => {
            registro.value.adminReg.username = 'updated one'
            // registro.value.age = 120
        }

        const handleSubmit = () => {
          console.log('Ejecutando handle')
            //VALIDACIÓN NÚMERO DE CARACTERES USUARIO
            //MÁXIMO
            registro.value.usuarioError = registro.value.adminReg.username.length > 4 ?
            '' : 'El usuario debe contener como mínimo 5 caracteres'
            //MÍNIMO
            registro.value.usuarioError = registro.value.adminReg.username.length > 20 ?
            'El usuario debe contener menos de 20 caracteres' : ''

            //VALIDACIÓN DEL NÚMERO DE CARACTERES CLAVE
            //MÍNIMO
            registro.value.passwordError = registro.value.adminReg.password.length > 7 ? 
            '' : 'La contraseña debe tener como mínimo 8 caracteres'
            //MÁXIMO
            registro.value.passwordError = registro.value.adminReg.password.length > 20 ? 
            'La contraseña debe ser menor de 20 caracteres' : ''

            //VALIDACIÓN DE CONINCIDENCIA DE CONTRAEÑAS
            registro.value.co_passwordError = registro.value.adminReg.password == registro.value.adminReg.co_password ?
            '' : 'Las contraseñas deben coincidir'

            console.log(registro.value.adminReg.co_password + '' + registro.value.usuarioError)
            //OTRAS VALIDACIONES
            //...
            //..
            //.            

            //PRINT DE LA DATA
            if (!registro.value.passwordError || !registro.value.usuarioError) {
                console.log('usuario', registro.value.adminReg.username)
                console.log('cedula', registro.value.adminReg.cedula)
                console.log('email', registro.value.adminReg.correo)
                console.log('telefono', registro.value.adminReg.telf_1)
                //console.log('codigo', registro.value.adminReg.codigo)
                console.log('contraseña', registro.value.adminReg.password)
                console.log('co_contraseña', registro.value.adminReg.co_password)
            }

            const { error, insert } = insertAdmin(adminReg)

            insert()
            
        }

        return {
          registro, handleSubmit
        }
    }
})
</script>

<style scoped>
.right img {
  width: 140px;
  margin: auto;
}

label {
  text-align: left;
  color: black;
  padding-left: 0.5rem;
  margin-bottom: 5px;
}
input {
  color: #464646;
    border: 1px solid #e9e9e9;
  border-radius: 10px;
    padding: 0.25rem 0.5rem;

}
</style>