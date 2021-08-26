<template>
    <div class="section">
      <div class="container__form">
        <div class="user signin-box">
          <div class="img__box"><img src="../assets/img/logo.png" /></div>
          <div class="form__box">
            <form class="form__login" autocomplete="off">
              <div class="form__title">
                <h2>Iniciar Sesion</h2>
              </div>

              <input
                type="text"
                v-model="userLogin.user"
                name="Cedula "
                placeholder="Usuario"
                class="form__input"
                autofocus
                required
              />
              <input
                type="password"
                v-model="userLogin.password"
                name="contraseña"
                placeholder="Contraseña"
                class="form__input"
                required
              />

              <!-- MOMENTANEAMENTE ERRORES Y ROUTERLINK -->
              <div>
                {{errores}}
              </div>

              <router-link :to="{ name: 'Principal' }">
                <button type="submit" value="Conectarse" class="form__submit" >
                  Conectarse
                </button>
              </router-link>

              <p class="form__remember">
                <!-- Tienes Cuenta? -->
                <router-link :to="{ name: 'Registro' }">
                    <a class="form__link">Registrate</a>
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, ref } from "@vue/runtime-core";
import login from '../funciones/login'

export default defineComponent({
    name: 'Ingreso',
    setup() {
      // const userLogin = ref({
      //   user: '',
      //   password: '',
      // })

      // provide('userLoged', userLogin)

      const userLogin : any = inject('userLoged')


      let errores = '' as any

      const submit = () => {
        
        console.log(userLogin.value.user + ' ' + userLogin.value.password)
        const { result, error, load } = login(userLogin.value.user, userLogin.value.password)
        load()

        if (!result) {
          errores = error.value
        }
        
      }

      return {
        submit, userLogin, errores
      }
    }
})
</script>

<style scoped>

</style>