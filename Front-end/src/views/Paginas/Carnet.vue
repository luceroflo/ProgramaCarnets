<template>
<div>
  <router-link :to="{ name: 'Ver' }">
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2">Atras</button>
  </router-link>
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2" @click="makePDF">Generar PDF</button>
  <router-link :to="{ name: 'EditUser' , params: { id: user.cedula } }">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2">Editar</button>
  </router-link>
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2" @click="EliminarUser">Eliminar</button>
</div>
<div  id="carnet">
  <div class="card">
      <div class="card__inner">
          <div class="card__face card__face--front">
              <div class="card__content">
                  <div class="card__header">
                      <h2>UNESR</h2>

                      <img  :src="user.foto" alt="" class="pp" />
                      <h2 class="font-sans italic text-base text-white">{{user.nombre}} {{user.apellido}}</h2>
                  </div>
                  <div class="card__info p-5">
                      <h3>{{user.role}}</h3>
                      <strong> <p>C.I: {{user.cedula}}</p> </strong>
                      <p></p>
                      <strong>Carrera: {{user.carrera}}</strong> 
                  </div>
                  <div class="card__body">
                      <!-- <strong>lacinia</strong> quis sapien placerat, <strong>laoreet</strong> tincidunt nulla.</p> -->
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { onMounted, ref } from "vue";
import getUser from "../../funciones/getUser";
import deleteUser from "../../funciones/deleteUser";
import { userModel } from "../../modelo/modeloUser";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";



export default defineComponent({
    name: 'Carnet',
    props: ['id'],
    setup(props) {

        let { user, userM, errorGet, load, showData } = getUser(props.id)
        let { eliminar, error } = deleteUser(props.id)
        let cedulaN = ref<Number | null>()
        let url : any = ref()
        var userReturn : userModel | undefined | null;

        onMounted(() => {
            Promise.resolve(load()).then(() => {
                userReturn = userM?.value;
                cedulaN.value = userReturn?.cedula;
            })
        })

        let makePDF = () => {
          var data = document.getElementById('carnet');  //Id of the table
          if (data !== null) {
            html2canvas(data).then(canvas => {  
              // Few necessary setting options  
              let imgWidth = 208;   
              let pageHeight = 295;    
              let imgHeight = canvas.height * imgWidth / canvas.width;  
              let heightLeft = imgHeight;  

              const contentDataURL = canvas.toDataURL('image/png')  
              let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
              let position = 10;  
              pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
              pdf.save('MYPdf.pdf'); // Generated PDF   
            });
          }
        }

        let EliminarUser = () => {
          console.log('Eliminar usuario triggered');
          Promise.resolve(eliminar()).then(() => {
            // userReturn = userM?.value;
            // cedulaN.value = userReturn?.cedula;
            console.log('Usuario eliminado')
          })
        }

        return {
            url, user, userM, showData, makePDF,
            EliminarUser
        }
    }
})
</script>

<style scoped>
:root {
  --primary: #FFCE00;
  --secondary: #FE4880;
  --dark: #212121;
  --light: #F3F3F3;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: montserrat, sans-serif;
  width: 100%;
  min-height: 100vh;
  background-image: url(https://image.freepik.com/vector-gratis/fondo-luces-puntuales_52683-43735.jpg); 
}

#carnet {
  margin: auto;
    margin-top: -70px;
}

.card {
  margin: 100px auto 0;
  width: 400px;
  height: 600px;
  perspective: 1000px;
  /* color: black */
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  /* cursor: pointer; */
  position: relative;
}

.card__inner.is-flipped {
  transform: rotateY(180deg);
}


.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
}

.card__face--front {
  background-image: linear-gradient(to bottom right, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__face--front h2 {
  color: #FFF;
  font-size: 32px;
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(180deg);
}

.card__content {
  width: 100%;
  height: 100%;
}

.card__header {
  position: relative;
  padding: 30px 30px 40px;
  background-color: #01519d;
}

.card__header:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to bottom left, var(--primary) 10%, var(--secondary) 115%);
  z-index: -1;
  border-radius: 0px 0px 50% 0px;
}

.pp {
  display: block;
  width: 168px;
  height: 168px;
  margin: 0 auto 30px;
  border-radius: 50%;
  background-color: #FFF;
  border: 5px solid #FFF;
  object-fit: cover;
}

/* .card__header h2 {
  color: #FFF;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
} */

.card__body {
  padding: 30px;
  /* background: #01519d; */
  background: url(https://universidadesgratuitas.com/wp-content/uploads/2020/02/escudo-UNESR.png); 
text-align: center;
image-resolution: 100px;
height: inherit;

}

.card__info h3 {
  color: var(--dark);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
}

.card__info p {
  color: var(--dark);
  font-size: 18px;
  line-height: 1.4;
}
</style>