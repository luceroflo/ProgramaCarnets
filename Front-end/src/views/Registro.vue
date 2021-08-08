<template>
    <div class="section">
      <div class="container__form">
        <div class="user signup-box">
            <div class="form__box">
                <form @submit.prevent="handleSubmit" class="form__login" autocomplete="off">
                <div class="form__title">
                    <h2>Registrarse</h2>
                </div>

                <input
                    v-model="registro.adminReg.username"
                    type="text"
                    name="Usuario"                    
                    placeholder="Usuario"
                    class="form__input"
                    required
                    autofocus
                />
                <div v-if="registro.usuarioError" class="error">{{registro.usuarioError}}</div>

                <input
                    v-model="registro.adminReg.nombre"
                    type="text"
                    name="Nombre"                    
                    placeholder="Nombre"
                    class="form__input"
                    required
                    autofocus
                />

                <input
                    v-model="registro.adminReg.apellido"
                    type="text"
                    name="Apellido"                    
                    placeholder="Apellido"
                    class="form__input"
                    required
                    autofocus
                />

                <input
                    v-model="registro.adminReg.cedula"
                    type="text"
                    name="Cedula"                    
                    placeholder="Cedula"
                    class="form__input"
                    required
                    autofocus
                />
                <input
                    v-model="registro.adminReg.correo"
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    class="form__input"
                    required
                />
                <input
                    v-model="registro.adminReg.telf_1"
                    type="number"
                    name="telefono"
                    placeholder="4142566555"
                    class="form__input"
                    required
                />
                <!-- <input
                    v-model="registro.adminReg.codigo"
                    type="codigo"
                    name="codigo"
                    placeholder="Código"
                    class="form__input"                    
                /> -->
                <input
                    v-model="registro.adminReg.password"
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    class="form__input"
                    required
                />
                <div v-if="registro.passwordError" class="error">{{registro.passwordError}}</div>
                <input
                    v-model="registro.adminReg.co_password"
                    type="password"
                    name="contraseña"
                    placeholder="Confirmar Contraseña"
                    class="form__input"
                    required
                />
                <div v-if="registro.co_passwordError" class="error">{{registro.co_passwordError}}</div>
                <button @click="handleSubmit" type="submit" value="Registrate" class="form__submit" >
                  Registrate
                </button>

                <p class="form__remember">
                    ¿Tienes Cuenta?
                    <router-link :to="{ name: 'Ingreso' }">
                        <a class="form__link">Inicia Sesión Aquí</a>
                    </router-link>
                </p>
                </form>
            </div>
            <div class="img__box"><img src="../assets/img/logo.png" /></div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "@vue/runtime-core";
import { adminModel } from "../modelo/modeloAdmin"
import insertAdmin from "../funciones/insertAdmin";

export default defineComponent({
    name: 'Registro',
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
 
  .signup-box {
    border-top-right-radius: 0;
  }
  
  .container__form.active .signup-box {
    pointer-events: initial;
  }
  
  .signup-box .form__box {
    left: 100%;
  }
  
  .container__form.active .signup-box .form__box {
    left: 0;
  }
  
  .signup-box .img__box {
    left: -100%;
  }
  .container__form.active .signup-box .img__box {
    left: 0;
  }
  
  .container__form.active .form__box {
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
  }
  
  .container__form.active .signup-box .img__box {
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
  }
  
  
  
  .signin-box .form__box {
    left: 0;
  }
  
  .container__form.active .signin-box .form__box {
    left: 100%;
  }
  
  .signin-box .img__box {
    left: 0;
  }
  .container__form.active .signin-box .img__box {
    left: -100%;
  }
  
  /* Estilos de la pagina princiopal Index  FIN*/
  
  /* Panel de Administraciòn */
  
  .container__panel {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    /* background-color: #000; */
  }


</style>