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
                    v-model="registro.usuario"
                    type="text"
                    name="Usuario"                    
                    placeholder="Usuario"
                    class="form__input"
                    required
                    autofocus
                />
                <input
                    v-model="registro.cedula"
                    type="text"
                    name="Cedula"                    
                    placeholder="Cedula"
                    class="form__input"
                    required
                    autofocus
                />
                <input
                    v-model="registro.email"
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    class="form__input"
                    required
                />
                <input
                    v-model="registro.telefono"
                    type="number"
                    name="telefono"
                    placeholder="4142566555"
                    class="form__input"
                    required
                />
                <input
                    v-model="registro.codigo"
                    type="codigo"
                    name="codigo"
                    placeholder="Código"
                    class="form__input"                    
                />
                <input
                    v-model="registro.password"
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    class="form__input"
                    required
                />
                <div v-if="registro.passwordError" class="error">{{registro.passwordError}}</div>
                <input
                    v-model="registro.co_password"
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

export default defineComponent({
    name: 'Registro',
    setup() {
              //Ref
        const registro = ref({ 
            usuario: '',
            cedula: '',
            email: '',
            telefono: '',
            codigo: '',
            password: '',
            co_password: '',
            //VALIDACIONES
            passwordError: '',
            co_passwordError: ''
        })
        const updateOne = () => {
            registro.value.usuario = 'updated one'
            // registro.value.age = 120
        }

        const handleSubmit = () => {
          console.log('Ejecutando handle')

            //VALIDACIÓN DEL NÚMERO DE CARACTERES
            registro.value.passwordError = registro.value.password.length > 7 ? 
            '' : 'La contraseña debe tener como mínimo 8 caracteres'

            //VALIDACIÓN DE CONINCIDENCIA DE CONTRAEÑAS
            registro.value.co_passwordError = registro.value.password == registro.value.co_password ?
            '' : 'Las contraseñas deben coincidir'

            console.log(registro.value.co_password)
            //OTRAS VALIDACIONES
            //...
            //..
            //.            

            //PRINT DE LA DATA
            if (!registro.value.passwordError) {
                console.log('usuario', registro.value.usuario)
                console.log('cedula', registro.value.cedula)
                console.log('email', registro.value.email)
                console.log('telefono', registro.value.telefono)
                console.log('codigo', registro.value.codigo)
                console.log('contraseña', registro.value.password)
                console.log('co_contraseña', registro.value.co_password)
            }
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