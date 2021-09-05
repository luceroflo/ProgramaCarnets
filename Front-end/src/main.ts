import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import './index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import  Vue  from 'vue';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// // Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(VueSweetalert2);

createApp(App)
.use(router)
.use(VueSweetalert2)
.mount('#app')
