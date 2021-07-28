<template>

    <div>
        <div>
            <h4>Uusarios Registrados</h4>
            <div class="filter-menu">
                <div>
                    <label for="">Filtrar por tipo:</label>
                    <select name="tipo" id="">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div>
                    <label for="">Buscar</label>
                    <input type="text" />
                </div>
            </div>
            <div class="cabecera-data">
                <label for="usuario">Nombre</label>
                <label for="cedula">Cédula</label>
                <label for="id">Carnet ID</label>
                <label for="Editar">Editar</label>
                <label for="Eliminar">Eliminar</label>
            </div>
            <div class="content-data">
                <div>
                    <p>Lucero</p>
                    <p>V-27789987</p>
                    <p>00012</p>
                    <p>icono E</p>
                    <p>icono D</p>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Ver'
})
</script>

<style scoped>
.content-data div, .cabecera-data {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;
    grid-gap: 5px;
}

.filter-menu {
    margin: auto;
    padding: 30px;
    background-color: aliceblue;
}

</style>