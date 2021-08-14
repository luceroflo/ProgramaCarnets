<template>
    <div>
        <div class="head-nav">
            <h2>Sistema de carnetización</h2>
            <router-link :to="{ name: 'VerAdmin' }">
                <button class="config-button">
                    Icono de config
                </button>
            </router-link>
        </div>
        <div class="main-content">
            <div>
                <router-link :to="{ name: 'Agregar' }">
                    <button>
                        Agregar
                    </button>
                </router-link>
            </div>
            <div>
                <router-link :to="{ name: 'Ver' }">
                    <button>
                        Ver - consultar
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, inject } from "@vue/runtime-core";

export default defineComponent({
    name: 'Principal',
    setup() {
        const userLoged = inject('userLoged')
        console.log(userLoged.value.user + ' ' + userLoged.value.password)
    }
})
</script>

<style scoped>
    .main-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
    }
    .main-content div {
        margin: auto;
        text-align: center;
    }
    .main-content button {
        cursor: pointer;
        padding: 50px;
        margin: auto;
        font-size: 20px;
        border-radius: 5px;
        background-color: dodgerblue;
        box-shadow: 10px 10px #98969638
    }
</style>