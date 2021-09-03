<template>

    <div>
        <h4>Uuusarios Registrados</h4>
        <div>
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
                    <input v-model="search" type="text" />
                </div>
            </div>
            <div class="cabecera-data">
                <label for="Editar">Nombre</label>
                <label for="usuario">Apellido</label>
                <label for="cedula">Cédula</label>
                <label for="Carrera">Carrera</label>
                <label for="Eliminar">Eliminar</label>
            </div>
            <div v-if="showData">
                <div v-for="user in datosPagineados"  v-bind:value="user" v-bind:key="user">
                    <router-link :to="{ name: 'EditUser' , params: { id: user.cedula } }">
                        <div class="content-data p-3">
                            <p>{{user.nombre}}</p>
                            <p>{{user.apellido}}</p>
                            <p>{{user.cedula}}</p>
                            <p>{{user.carrera}}</p>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-12 h-10 rounded-full" @click="deleteAction()">
                                eliminar
                            </button>
                        </div>
                    </router-link> 
                </div>                
            </div>
            <!-- <div v-if="showData" class="content-data">
                <div v-for="user in listaUsers"  v-bind:value="user" v-bind:key="user">
                    <p>{{user.nombre}}</p>
                    <p>{{user.cedula}}</p>
                    <p>{{user.id}}</p>
                    <router-link :to="{ name: 'EditUser' , params: { id: user.cedula } }">
                        <button>
                            editar
                        </button>
                    </router-link>
                    <button class="delete">eliminar</button>
                </div>
            </div> -->
            <div class="loading" v-else>
                Cargando la data ...
            </div>
            <div>
               




 <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Previous
      </a>
      <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Mostrando
          {{ ' ' }}
          <span class="font-medium">1</span>
          {{ ' ' }}
          hasta
          {{ ' ' }}
          <span class="font-medium">10</span>
          {{ ' ' }}
          de
          {{ ' ' }}
          <span class="font-medium">97</span>
          {{ ' ' }}
          resultados
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a v-on:click="getPrevoiusPage()" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Anterior</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <!-- <a aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            1
          </a> -->
          <span v-for="pagina in TotalPaginas()" v-on:click="getDataPagina(pagina)" class="relative inline-flex items-center px-4 py-2 focus:bg-gray-400 active:bg-gray-400 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            {{pagina}}
          </span>
          <!-- <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            10
          </a> -->
          <a v-on:click="getNextPage()" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Siguiente</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>





            </div>
        </div>
    </div>
  
</template>

<script lang="ts">

import { defineComponent, onMounted, onUpdated } from "@vue/runtime-core";
import { computed, provide, ref, unref } from "vue";
import getUsers from "../../funciones/getUsers"
import { userModel } from "../../modelo/modeloUser";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

// import '@ocrv/vue-tailwind-pagination/styles'
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'


export default defineComponent({
    name: 'Ver',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
    },
    setup() {

        let { users, listLength, listaUsers, error, load, showData } = getUsers()
        //provide('userData', users)
        let pagination = ref({
            currentPage: 1,
            perPage: 10,
            total: listLength
        })

        //let rawData: userModel[] = []
        let rawData: Array<userModel> = []

        let datosPagineados = ref<userModel[]>()

        const search = ref('') 
        let names = ref(users)
        let searchResult: userModel[] = [];
        let x : any;
        const matching = computed(() => {

        })

        const deleteAction = () => {
            console.log("Eliminar clicked")
        }

        onMounted(() => {
            load()
            Promise.resolve(load()).then(() => {
                //AFTER LOAD EXECUTED 
                if (listaUsers.value != undefined) {
                    console.log('Data Total = ', listaUsers.value.length)
                }
                getDataPagina(1)
            })
        })

        onUpdated(() => {            
            // names.value.filter((n) => {
            //     n.includes(search);
            // })
            console.log(showData.value)
            names.value.forEach((a : userModel) => {
                //console.log(a.nombre);
                if(a.nombre == search.value || a.cedula == parseInt(search.value)){
                    console.log(a);
                    searchResult.push(a);
                }
            })
            x = searchResult;
            users = ref(x);
        })

        let TotalPaginas = () => {
            //console.log(Math.ceil(users.value.length / pagination.value.perPage))
            if (listLength.value != undefined) {
                return Math.ceil(listLength.value / pagination.value.perPage)
            } else {
                return 0
            }
        }

        let getDataPagina = (noPagina : number) => {
            pagination.value.currentPage = noPagina
            rawData = []
            let ini = (noPagina * pagination.value.perPage) - pagination.value.perPage
            let fin = (noPagina * pagination.value.perPage)

            console.log('En GETDATA with index', noPagina)
            for (let index = ini; index < fin; index++) {
                if (listaUsers.value != undefined) {
                    // console.log('En GETDATA with index', listaUsers?.value[index])

                    //rawData.push(unref(listaUsers?.value[index]))
                    datosPagineados.value = listaUsers.value.slice(ini,fin)
                } else {
                    console.log('Lista Users undefined')
                }   
            }
            // rawData.forEach(element => {
            //     console.log(element)
            // });

            //datosPagineados.value = rawData
            console.log('datos ', datosPagineados.value)
        }

        let getPrevoiusPage = () => {
            if (pagination.value.currentPage > 1) {
                pagination.value.currentPage--
            }
            getDataPagina(pagination.value.currentPage)
        }
        let getNextPage = () => {
            if (TotalPaginas != undefined) {
                if (pagination.value.currentPage < TotalPaginas()) {
                    pagination.value.currentPage++
                }
                getDataPagina(pagination.value.currentPage)
            } else {
                console.log('Total paginas es undefined o nulo')
            }
        }


        return {
            users, error, search, matching, showData, listaUsers,
            pagination, ChevronLeftIcon, ChevronRightIcon, TotalPaginas, datosPagineados, getDataPagina, getPrevoiusPage, getNextPage,
            deleteAction
        }
    }
})
</script>

<style scoped>
.content-data, .cabecera-data {
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
    .loading {
        margin-top: 30px;
    }

.delete { 
    background: red;
}
span {
    cursor: pointer
}

</style>