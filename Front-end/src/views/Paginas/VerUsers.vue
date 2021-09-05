<template>
<div class="atras">
  <router-link :to="{ name: 'Principal' }">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2">Regresar</button>
  </router-link>
</div>
<div class="">
    <div class="filter-menu">
        <h4 class="text-4xl italic text-white mb-7">Usarios Registrados</h4>
        <div class="grid grid-cols-2 gap-4">
            <div class="">
                <label class="font-mono text-base" for="">Filtrar por tipo:</label>
                <select name="tipo" id="" class="h-8">
                    <option value="Estudiante">Estudiante</option>
                    <option value="Docente">Docente</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>
            <div class="">
                <label class="font-mono text-base" for="">Buscar:</label>
                <input type="text" placeholder="Buscar..." v-model="searchQuery" />
            </div>
        </div>
    </div>
    <div class="tabla pt-5 pb-20">
        <div class="cabecera-data p-3">
            <label class="font-mono text-black" for="Editar">Nombre</label>
            <label class="font-mono text-black" for="usuario">Apellido</label>
            <label class="font-mono text-black" for="cedula">Cédula</label>
            <label class="font-mono text-black" for="Eliminar">Teléfono</label>
            <label class="font-mono text-black" for="Carrera">Carrera/Especialización</label>
        </div>
        <div v-if="showData">
            <div v-for="user in datosPagineados"  v-bind:value="user" v-bind:key="user">
                <router-link :to="{ name: 'Carnet' , params: { id: user.cedula } }">
                    <div class="content-data p-3">
                        <p>{{user.nombre}}</p>
                        <p>{{user.apellido}}</p>
                        <p>{{user.cedula}}</p>
                        <p>{{user.telf_1}}</p>
                        <p>{{user.carrera}}</p>
                    </div>
                </router-link> 
            </div>                
        </div>
        <div class="loading" v-else>
            Cargando la data ...
        </div>
        <div class="mt-5 px-10">
            <!-- <div class="flex-1 flex justify-between sm:hidden">
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                </a>
                <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                </a>
            </div> -->
            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
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
                    <span class="font-medium">{{pagination.total}}</span>
                    {{ ' ' }}
                    resultados
                    </p>
                </div>
                <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a v-on:click="getPrevoiusPage()" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium cursor-pointer text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">Anterior</span>
                            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                        <!-- <a aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            1
                        </a> -->
                        <span v-for="pagina in TotalPaginas(true)" v-on:click="getDataPagina(pagina, false, true)" class="relative inline-flex items-center px-4 py-2 focus:bg-gray-400 cursor-pointer active:bg-gray-400 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            {{pagina}}
                        </span>
                        <!-- <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            10
                        </a> -->
                        <a v-on:click="getNextPage()" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointerhover:bg-gray-50">
                            <span class="sr-only">Siguiente</span>
                            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    </div>  
</template>

<script lang="ts">

import { defineComponent, onMounted, onUpdated } from "@vue/runtime-core";
import { computed, isRef, provide, ref, unref, watch } from "vue";
import getUsers from "../../funciones/getUsers"
import { userModel } from "../../modelo/modeloUser";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

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

        let lista = ref(listLength.value)

        //let rawData: userModel[] = []
        let rawData: Array<userModel> = []

        let datosPagineados = ref<userModel[]>()

        const search = ref('') 
        const searchQuery = ref('');
        let searchResult = ref<userModel[]>();
        let x : any;
        const matching = computed(() => {

        })

        watch(searchQuery, (newValue, oldValue) => {
            console.log('searQuery' + searchQuery.value)
            getDataPagina(0, true, true)
        })

        onMounted(() => {
            load()
            Promise.resolve(load()).then(() => {
                //AFTER LOAD EXECUTED 
                if (listaUsers.value != undefined) {
                    console.log('Data Total = ', listaUsers.value.length)
                }
                getDataPagina(1, false, false)
            })
        })

        onUpdated(() => {   
            console.log('Search query value ' + searchQuery.value)
        })

        let TotalPaginas = (reload: boolean) => {
            //console.log(Math.ceil(users.value.length / pagination.value.perPage))
            if (lista.value != undefined) {
                console.log('list' + lista.value)          
                console.log('Maths' + Math.ceil(lista.value / pagination.value.perPage))
                return Math.ceil(lista.value / pagination.value.perPage)
            } else if (listLength.value != undefined && searchQuery.value == '') {
                console.log('default')
                return Math.ceil(listLength.value / pagination.value.perPage)
            } else {
                return 0
            }
        
        }
        

        let getDataPagina = (noPagina : number, filter : boolean, omit : boolean) => {
            //searchedProducts()
            let ini: number;
            let fin: number;

            if (!filter) {
                // console.log('filter false ', filter)
                pagination.value.currentPage = noPagina
            } else {
                // console.log('filter true ', filter)            
                noPagina = pagination.value.currentPage
            }
            ini = (noPagina * pagination.value.perPage) - pagination.value.perPage
            fin = (noPagina * pagination.value.perPage)

            console.log('printing PAGE with index', pagination.value.currentPage)
            //#region FILTER
            if (listaUsers.value != undefined) {
                if (filter) {
                    searchResult.value = [];
                    listaUsers.value.filter((user) => {
                        //Filtros
                        let belongCedula = false;
                        if (user.cedula != null) {
                            belongCedula = user.cedula.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1; 
                        }
                        let belongNombre = user.nombre.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
                        let belongApellido = user.apellido.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
                        let belongCarrera = user.carrera.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1; 
                        //Pushing to searchResult
                        if (belongNombre || belongApellido || belongCedula || belongCarrera) {
                            //console.log('nombres coincidentes ' + user.nombre);
                            if (searchResult.value != undefined) {
                                //console.log('push value');
                                searchResult.value.push(user);
                            }
                        }
                    });
                    if (searchResult.value != undefined) {
                        for (let index = ini; index < fin; index++) {
                            datosPagineados.value = searchResult.value.slice(ini,fin)   
                        }
                        lista = ref(searchResult.value.length)
                        console.log('número de coincidencias ' + lista.value)
                        TotalPaginas(true)              
                    }  
                    //Pagination                           
                }
                else {
                    //For de todos los datos
                    if (omit) {
                        console.log('omit true ' + omit)   
                        if (searchResult.value != undefined) {
                            for (let index = ini; index < fin; index++) {
                                datosPagineados.value = searchResult.value.slice(ini,fin)   
                            } 
                        }                                             
                    } else {
                        console.log('omit false ' + omit)    
                        for (let index = ini; index < fin; index++) {
                            datosPagineados.value = listaUsers.value.slice(ini,fin)   
                        }                                                
                    }              
                }  
            } 
            //#endregion       
            else {
                console.log('Lista Users undefined')
            } 
        };

        let getPrevoiusPage = () => {
            if (pagination.value.currentPage > 1) {
                pagination.value.currentPage--
            }
            getDataPagina(pagination.value.currentPage, false, true)
        }
        let getNextPage = () => {
            if (TotalPaginas != undefined) {
                if (pagination.value.currentPage < TotalPaginas(false)) {
                    pagination.value.currentPage++
                }
                getDataPagina(pagination.value.currentPage, false, true)
            } else {
                console.log('Total paginas es undefined o nulo')
            }
        }


        return {
            //INFO OBJECTS USER
            users, error, search, matching, showData, listaUsers,
            //PAGINATION
            pagination, ChevronLeftIcon, ChevronRightIcon, TotalPaginas, datosPagineados, getDataPagina, getPrevoiusPage, getNextPage,
            //SEARCH QUERY
            searchQuery, //searchedProducts
        }
    }
})
</script>

<style scoped>
.content-data, .cabecera-data {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 2fr;
    text-align: center;
    grid-gap: 5px;
        border-bottom: 1px solid gray;

}
.tabla {
    background-color: aliceblue;
}
/* .content-data {
    background-color: #eaeaea;
} */

.filter-menu label {
    color: white;
}
.atras {
    position: absolute;
    margin-top: 20px;
    margin-left: 20px;
}

.filter-menu {
    margin: auto;
    padding: 30px;
/* background-color: aliceblue; */
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1239%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1240)'%3e%3c/rect%3e%3cpath d='M-111.69 519.95L-111.69 519.95' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-111.69 519.95L39.2 562.38' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-111.69 519.95L56.04 644.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-111.69 519.95L60.88 355.83' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-111.69 519.95L207.39 533.8' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-111.69 519.95L202.9 375.99' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M60.88 355.83L60.88 355.83' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M60.88 355.83L202.9 375.99' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M60.88 355.83L39.2 562.38' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M39.2 562.38L39.2 562.38' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M39.2 562.38L56.04 644.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M39.2 562.38L207.39 533.8' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M39.2 562.38L241.57 654.73' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M56.04 644.27L56.04 644.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M56.04 644.27L241.57 654.73' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M56.04 644.27L207.39 533.8' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M202.9 375.99L202.9 375.99' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M207.39 533.8L207.39 533.8' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M207.39 533.8L241.57 654.73' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M207.39 533.8L202.9 375.99' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M207.39 533.8L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M241.57 654.73L241.57 654.73' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M241.57 654.73L353.14 652.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M241.57 654.73L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M358.91 343.62L358.91 343.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M358.91 343.62L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M358.91 343.62L202.9 375.99' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M358.91 343.62L537.1 412.37' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M359.57 491.75L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M353.14 652.27L353.14 652.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L537.1 412.37' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L523.65 517.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L649.68 383.11' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M537.1 412.37L686.64 208.69' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M523.65 517.1L523.65 517.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M523.65 517.1L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M523.65 517.1L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L511.95 703.19' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L674.25 703.85' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L353.14 652.27' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L523.65 517.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L359.57 491.75' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M511.95 703.19L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M686.64 208.69L686.64 208.69' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M686.64 208.69L837.57 203.96' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M686.64 208.69L649.68 383.11' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M686.64 208.69L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M649.68 383.11L649.68 383.11' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M649.68 383.11L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M649.68 383.11L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M692.14 503.05L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M692.14 503.05L836.08 527.84' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M692.14 503.05L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M674.25 703.85L674.25 703.85' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M674.25 703.85L823 640.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M674.25 703.85L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M674.25 703.85L836.08 527.84' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M674.25 703.85L523.65 517.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M837.57 203.96L837.57 203.96' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M837.57 203.96L981.5 247.2' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M837.57 203.96L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M837.57 203.96L950.66 53.6' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M837.57 203.96L998.66 375.19' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M793.06 373.45L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M793.06 373.45L836.08 527.84' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M836.08 527.84L836.08 527.84' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M836.08 527.84L943.09 491.98' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M836.08 527.84L823 640.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M836.08 527.84L1004.5 671.92' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M836.08 527.84L998.66 375.19' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M823 640.1L823 640.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M823 640.1L1004.5 671.92' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M823 640.1L692.14 503.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L977.62 -65.85' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L950.66 53.6' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L1114.51 -43.41' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L1100.98 79.55' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L1253.98 -55.93' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M977.62 -65.85L837.57 203.96' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M950.66 53.6L950.66 53.6' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M950.66 53.6L1100.98 79.55' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M950.66 53.6L1114.51 -43.41' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M950.66 53.6L981.5 247.2' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M981.5 247.2L981.5 247.2' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M981.5 247.2L998.66 375.19' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M981.5 247.2L1111.15 225.26' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M981.5 247.2L1126.76 343.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M998.66 375.19L998.66 375.19' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M998.66 375.19L943.09 491.98' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M998.66 375.19L1126.76 343.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M998.66 375.19L1111.15 225.26' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M998.66 375.19L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M943.09 491.98L943.09 491.98' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M943.09 491.98L1004.5 671.92' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M943.09 491.98L823 640.1' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M943.09 491.98L793.06 373.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1004.5 671.92L1004.5 671.92' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1004.5 671.92L1098.13 672.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1004.5 671.92L1145.17 550.04' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1114.51 -43.41L1114.51 -43.41' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1114.51 -43.41L1100.98 79.55' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1114.51 -43.41L1253.98 -55.93' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1100.98 79.55L1100.98 79.55' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1100.98 79.55L1111.15 225.26' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1111.15 225.26L1111.15 225.26' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1111.15 225.26L1126.76 343.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1111.15 225.26L1300.48 261.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1126.76 343.25L1126.76 343.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1126.76 343.25L1270.19 398.94' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1126.76 343.25L1300.48 261.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.17 550.04L1145.17 550.04' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.17 550.04L1098.13 672.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.17 550.04L1290.52 498.82' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1098.13 672.25L1098.13 672.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1098.13 672.25L1310.68 640.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1098.13 672.25L943.09 491.98' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1253.98 -55.93L1253.98 -55.93' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1253.98 -55.93L1258.92 84.51' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1253.98 -55.93L1100.98 79.55' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1253.98 -55.93L1454.3 -97.9' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1253.98 -55.93L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1258.92 84.51L1258.92 84.51' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1258.92 84.51L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1300.48 261.74L1300.48 261.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1300.48 261.74L1416.14 250.39' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1300.48 261.74L1270.19 398.94' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1300.48 261.74L1258.92 84.51' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1300.48 261.74L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1270.19 398.94L1270.19 398.94' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1270.19 398.94L1290.52 498.82' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1290.52 498.82L1290.52 498.82' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1290.52 498.82L1310.68 640.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1290.52 498.82L1446.78 516.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1290.52 498.82L1403.56 669.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1290.52 498.82L1126.76 343.25' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1310.68 640.49L1310.68 640.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1310.68 640.49L1403.56 669.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1454.3 -97.9L1454.3 -97.9' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1454.3 -97.9L1612.07 -91.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1454.3 -97.9L1549.19 43.56' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1454.3 -97.9L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1454.3 -97.9L1258.92 84.51' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1390.46 102.74L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1390.46 102.74L1416.14 250.39' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1390.46 102.74L1549.19 43.56' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1416.14 250.39L1416.14 250.39' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.78 516.62L1446.78 516.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.78 516.62L1403.56 669.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.78 516.62L1600.86 557.13' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.78 516.62L1310.68 640.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.56 669.62L1403.56 669.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.56 669.62L1603.75 643.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.56 669.62L1600.86 557.13' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1612.07 -91.45' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1549.19 43.56' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1579.39 262.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1253.98 -55.93' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1612.07 -91.45L1416.14 250.39' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.19 43.56L1549.19 43.56' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.39 262.05L1579.39 262.05' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.39 262.05L1416.14 250.39' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.39 262.05L1549.19 43.56' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.39 262.05L1390.46 102.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.39 262.05L1300.48 261.74' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.86 557.13L1600.86 557.13' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.86 557.13L1603.75 643.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1603.75 643.49L1603.75 643.49' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1603.75 643.49L1446.78 516.62' stroke='%23132e65' stroke-width='1.5'%3e%3c/path%3e%3ccircle r='5' cx='-111.69' cy='519.95' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='60.88' cy='355.83' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='39.2' cy='562.38' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='56.04' cy='644.27' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='202.9' cy='375.99' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='207.39' cy='533.8' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='241.57' cy='654.73' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='358.91' cy='343.62' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='359.57' cy='491.75' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='353.14' cy='652.27' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='537.1' cy='412.37' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='523.65' cy='517.1' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='511.95' cy='703.19' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='686.64' cy='208.69' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='649.68' cy='383.11' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='692.14' cy='503.05' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='674.25' cy='703.85' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='837.57' cy='203.96' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='793.06' cy='373.45' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='836.08' cy='527.84' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='823' cy='640.1' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='977.62' cy='-65.85' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='950.66' cy='53.6' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='981.5' cy='247.2' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='998.66' cy='375.19' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='943.09' cy='491.98' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1004.5' cy='671.92' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1114.51' cy='-43.41' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1100.98' cy='79.55' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1111.15' cy='225.26' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1126.76' cy='343.25' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1145.17' cy='550.04' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1098.13' cy='672.25' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1253.98' cy='-55.93' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1258.92' cy='84.51' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1300.48' cy='261.74' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1270.19' cy='398.94' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1290.52' cy='498.82' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1310.68' cy='640.49' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1454.3' cy='-97.9' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1390.46' cy='102.74' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1416.14' cy='250.39' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1446.78' cy='516.62' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1403.56' cy='669.62' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1612.07' cy='-91.45' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1549.19' cy='43.56' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1579.39' cy='262.05' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1600.86' cy='557.13' fill='%23132e65'%3e%3c/circle%3e%3ccircle r='5' cx='1603.75' cy='643.49' fill='%23132e65'%3e%3c/circle%3e%3cpath d='M370.79 707.59L370.79 707.59' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M370.79 707.59L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M370.79 707.59L521.01 668.36' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M370.79 707.59L348.54 536.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M370.79 707.59L249.27 523.97' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M521.01 668.36L521.01 668.36' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M521.01 668.36L527.19 527.4' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M521.01 668.36L675.67 675.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M521.01 668.36L656.33 552.24' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M849.91 351.08L849.91 351.08' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M849.91 351.08L965.01 407.54' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M849.91 351.08L853.3 490.82' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M849.91 351.08L647.92 395.06' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M849.91 351.08L999.78 520.46' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1145.5 107.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1241.71 92.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1157.66 240.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1287.59 -43.07' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1145.5 107.83L1089.12 355.58' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1298.17 380.49' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1439.02 386.47' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1295.72 539.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1298.17 380.49L1157.66 240.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1295.72 539.83L1295.72 539.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1295.72 539.83L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1295.72 539.83L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1295.72 539.83L1268.09 694.76' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L1268.09 694.76' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L1127.86 704.67' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L1462.1 658.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1268.09 694.76L996.74 648.55' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1449.08 -60.24L1449.08 -60.24' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1449.08 -60.24L1438.32 45.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1449.08 -60.24L1570.55 -70.99' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1449.08 -60.24L1287.59 -43.07' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1449.08 -60.24L1540.45 107.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.47 232.33L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.47 232.33L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.47 232.33L1439.02 386.47' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1403.47 232.33L1540.45 107.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L-78.52 492.11' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L-92.56 643.59' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L70.96 555.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L108.24 703.77' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L249.27 523.97' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-78.52 492.11L348.54 536.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-92.56 643.59L-92.56 643.59' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-92.56 643.59L70.96 555.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-92.56 643.59L108.24 703.77' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M70.96 555.91L70.96 555.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M70.96 555.91L108.24 703.77' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M70.96 555.91L249.27 523.97' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M70.96 555.91L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M108.24 703.77L108.24 703.77' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M108.24 703.77L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M249.27 523.97L249.27 523.97' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M249.27 523.97L348.54 536.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M249.27 523.97L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M225.92 657.21L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M348.54 536.91L348.54 536.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M348.54 536.91L225.92 657.21' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M348.54 536.91L527.19 527.4' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M348.54 536.91L521.01 668.36' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M348.54 536.91L70.96 555.91' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M527.19 527.4L527.19 527.4' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M527.19 527.4L656.33 552.24' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M527.19 527.4L647.92 395.06' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M527.19 527.4L675.67 675.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M647.92 395.06L647.92 395.06' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M647.92 395.06L656.33 552.24' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M647.92 395.06L853.3 490.82' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M647.92 395.06L675.67 675.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M656.33 552.24L656.33 552.24' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M656.33 552.24L675.67 675.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M656.33 552.24L853.3 490.82' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M656.33 552.24L849.91 351.08' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M675.67 675.41L675.67 675.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M853.3 490.82L853.3 490.82' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M853.3 490.82L965.01 407.54' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M853.3 490.82L999.78 520.46' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M853.3 490.82L996.74 648.55' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M965.01 407.54L965.01 407.54' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M965.01 407.54L999.78 520.46' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M965.01 407.54L1089.12 355.58' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M999.78 520.46L999.78 520.46' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M999.78 520.46L996.74 648.55' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M999.78 520.46L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M996.74 648.55L996.74 648.55' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M996.74 648.55L1127.86 704.67' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M996.74 648.55L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1157.66 240.15L1157.66 240.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1157.66 240.15L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1157.66 240.15L1089.12 355.58' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1157.66 240.15L1241.71 92.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1157.66 240.15L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1089.12 355.58L1089.12 355.58' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1089.12 355.58L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1144.42 517.12L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1127.86 704.67L1127.86 704.67' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1127.86 704.67L1144.42 517.12' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1127.86 704.67L999.78 520.46' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1127.86 704.67L1295.72 539.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1127.86 704.67L1462.1 658.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1287.59 -43.07L1287.59 -43.07' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1287.59 -43.07L1241.71 92.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1241.71 92.33L1241.71 92.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1241.71 92.33L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1241.71 92.33L1438.32 45.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1269.69 253.19L1269.69 253.19' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1438.32 45.15L1438.32 45.15' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1438.32 45.15L1540.45 107.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1438.32 45.15L1287.59 -43.07' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1438.32 45.15L1570.55 -70.99' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1438.32 45.15L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1439.02 386.47L1439.02 386.47' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1439.02 386.47L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1439.02 386.47L1587.64 402.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1439.02 386.47L1607.89 495.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1439.02 386.47L1295.72 539.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.13 530.41L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.13 530.41L1462.1 658.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1462.1 658.41L1462.1 658.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1462.1 658.41L1605.82 679.49' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1462.1 658.41L1295.72 539.83' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1570.55 -70.99L1570.55 -70.99' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1570.55 -70.99L1540.45 107.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1570.55 -70.99L1287.59 -43.07' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1570.55 -70.99L1607.57 220.95' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1540.45 107.33L1540.45 107.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1540.45 107.33L1607.57 220.95' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.57 220.95L1607.57 220.95' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.57 220.95L1587.64 402.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.57 220.95L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1587.64 402.37L1587.64 402.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1587.64 402.37L1607.89 495.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1587.64 402.37L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1587.64 402.37L1403.47 232.33' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1587.64 402.37L1605.82 679.49' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.89 495.37L1607.89 495.37' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.89 495.37L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.89 495.37L1605.82 679.49' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.89 495.37L1462.1 658.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1607.89 495.37L1607.57 220.95' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1605.82 679.49L1605.82 679.49' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1605.82 679.49L1443.13 530.41' stroke='hsl(228.5%2c 77.2%25%2c 51.5%25)' stroke-width='1.5'%3e%3c/path%3e%3ccircle r='25' cx='370.79' cy='707.59' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='521.01' cy='668.36' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='849.91' cy='351.08' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1145.5' cy='107.83' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1298.17' cy='380.49' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1295.72' cy='539.83' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1268.09' cy='694.76' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1449.08' cy='-60.24' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='25' cx='1403.47' cy='232.33' fill='url(%23SvgjsRadialGradient1241)'%3e%3c/circle%3e%3ccircle r='5' cx='-78.52' cy='492.11' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='-92.56' cy='643.59' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='70.96' cy='555.91' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='108.24' cy='703.77' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='249.27' cy='523.97' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='225.92' cy='657.21' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='348.54' cy='536.91' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='527.19' cy='527.4' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='647.92' cy='395.06' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='656.33' cy='552.24' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='675.67' cy='675.41' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='853.3' cy='490.82' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='965.01' cy='407.54' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='999.78' cy='520.46' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='996.74' cy='648.55' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1157.66' cy='240.15' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1089.12' cy='355.58' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1144.42' cy='517.12' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1127.86' cy='704.67' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1287.59' cy='-43.07' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1241.71' cy='92.33' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1269.69' cy='253.19' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1438.32' cy='45.15' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1439.02' cy='386.47' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1443.13' cy='530.41' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1462.1' cy='658.41' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1570.55' cy='-70.99' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1540.45' cy='107.33' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1607.57' cy='220.95' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1587.64' cy='402.37' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1607.89' cy='495.37' fill='%238b9ad9'%3e%3c/circle%3e%3ccircle r='5' cx='1605.82' cy='679.49' fill='%238b9ad9'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1239'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1240'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(28%2c 79%2c 147%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cradialGradient id='SvgjsRadialGradient1241'%3e%3cstop stop-color='white' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='%231735b3' offset='0.2'%3e%3c/stop%3e%3cstop stop-color='rgba(23%2c 53%2c 179%2c 0)' offset='1'%3e%3c/stop%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e");
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
label {
    margin-right: 0.5rem;
}


</style>