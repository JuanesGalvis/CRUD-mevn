import Vue from 'vue';
import App from './components/app.vue'

new Vue({
    // renderizar componenten App
    render: h => h(App)

}).$mount('#app') // div#app