import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
import router from "./router";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';


import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeflex/primeflex.css"        
import "primeicons/primeicons.css"   
import "./global-styles.css"                     

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(store);

app
    .component('Menubar', Menubar)
    .component('Divider', Divider)
    .component('Button', Button)
    .component('Password', Password)
    .component('InputText', InputText)
    .component('Textarea', Textarea)
    .component('Card', Card)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Dialog', Dialog);

app.mount("#app");
