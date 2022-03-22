import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
import router from "./router";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"          
import "primeicons/primeicons.css"                        

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(store);

app
    .component('Button', Button)
    .component('Password', Password)
    .component('InputText', InputText)
    .component('Dialog', Dialog);

app.mount("#app");